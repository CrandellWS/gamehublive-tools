/* ===========================================================
 * Canvas Racer – single track, even spacing, local images only
 * ===========================================================
 * - Auto-creates a <canvas> inside #track and resizes on demand
 * - Asphalt background with horizontally scrolling dashed stripes
 * - Slower dotted borders above and below race area
 * - Racers are evenly distributed vertically (fit-contain)
 * - Local avatars: <input id="inpPlayerFiles" type="file" multiple>
 *   (never uploaded; uses URL.createObjectURL)
 * - Rubber-banding + chaos wobble; finish line near right edge
 * - Minimal external dependencies; runs as soon as startRace() is called
 */

(() => {
    /* ---------- Utilities ---------- */
    const uid   = () => Math.random().toString(36).slice(2, 9);
    const lerp  = (a,b,t) => a + (b-a) * t;
    const clamp = (v,a,b) => Math.max(a, Math.min(b, v));
    const nowMs = () => performance.now();
    const rand   = (a,b) => a + Math.random()*(b-a);
    const choice = arr => arr[(Math.random()*arr.length)|0];

    /* ---------- Global state ---------- */
    const state = {
        settings: {
            durationSec: 25,          // target race length
            finishPctFromRight: 12,   // finish band distance from right (percent)
            chaos: 0.55,              // side-to-side/wobble + micro surges
            rubber: 0.7,              // catch-up pressure (0..1)
            baseSpeed: 220,           // camera speed px/sec (visual flow)
            stripeSpeed: 1.0,         // stripes scroll factor vs camera
            borderSpeed: 0.4,          // dotted borders scroll factor vs camera
            // pacing & behavior knobs
            leadPhases: 5,               // number of momentum-shift phases in one race
            phaseMinSec: 3.5,            // min phase length
            phaseMaxSec: 6.0,            // max phase length
            phaseFavorBoost: 90,         // px/sec temporary boost for the favored racer in a phase

            dragAhead: 70,               // px/sec drag if you're clearly leading
            slipstreamBoost: 55,         // px/sec bonus when tailing someone closely

            surgeChance: 0.14,           // per-second chance of a burst
            surgeBoost: 160,             // burst strength in px/sec for ~0.5s

            momentum: 0.78,              // 0..1; higher = smoother (slower changes)
            fatigueCurve: 0.18           // 0..1; ramps down the base pace late-race

        },
        players: [],                // [{id, name, imgUrl?, emoji?}]
        race: {
            running: false,
            startMs: 0,
            camX: 0,
            racers: [],               // [{id, name, img?, emoji?, x,y, v, leadBias, imgReady}]
            raf: 0,
            winner: null
        }
    };

    /* ---------- DOM ---------- */
    const track = document.getElementById('track') || document.body;
    const fileInput = document.getElementById('inpPlayerFiles'); // optional
    const winnerOverlay = document.getElementById('winnerBanner'); // optional
    const winnerNameEl  = document.getElementById('winnerName');   // optional

    /* ---------- Canvas setup ---------- */
    let canvas, ctx, DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;

    function buildRaceScript() {
        const n = state.race.racers.length;
        const phases = [];
        let t = 0;
        for (let i=0; i<state.settings.leadPhases; i++) {
            const len = rand(state.settings.phaseMinSec, state.settings.phaseMaxSec);
            const favored = choice(state.race.racers).id;
            phases.push({ start: t, end: t + len, favored });
            t += len;
        }
        // pad to full duration
        phases.push({ start: t, end: state.settings.durationSec, favored: null });
        state.race.phases = phases;
    }

    function ensureCanvas() {
        if (canvas) return;
        canvas = document.createElement('canvas');
        canvas.id = 'raceCanvas';
        canvas.style.display = 'block';
        canvas.style.width   = '100%';
        canvas.style.height  = '100%';
        canvas.style.position = 'absolute';
        canvas.style.inset = '0';
        canvas.style.zIndex = '0';
        // Make #track a positioned container if not already
        const cs = getComputedStyle(track);
        if (cs.position === 'static') track.style.position = 'relative';
        track.appendChild(canvas);
        ctx = canvas.getContext('2d');
        resizeCanvas();
    }

    function resizeCanvas() {
        const r = track.getBoundingClientRect();
        W = Math.max(2, Math.floor(r.width));
        H = Math.max(2, Math.floor(r.height));
        canvas.width  = Math.floor(W * DPR);
        canvas.height = Math.floor(H * DPR);
        ctx.setTransform(1,0,0,1,0,0);
        ctx.scale(DPR, DPR);
    }

    window.addEventListener('resize', () => {
        if (!canvas) return;
        resizeCanvas();
        // Re-seat racers vertically on resize to preserve even spacing
        if (state.race.racers.length) placeRacersEvenly();
    });

    /* ---------- Players & local images ---------- */
    function addPlayer(name, src) {
        state.players.push({ id: uid(), name, imgUrl: src });
    }

    function addPlayersFromFiles(fileList) {
        for (const f of fileList) {
            const url = URL.createObjectURL(f); // stays local / never uploaded
            const base = f.name.replace(/\.[^.]+$/, '');
            addPlayer(base, url);
        }
    }

    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            addPlayersFromFiles(e.target.files);
        });
    }

    /* ---------- Racer objects ---------- */
    function buildRacers() {
        if (!state.players.length) {
            const em = ['🦆','🚀','🐢','🏎️','🦄','🐸','🦖','🐱'];
            for (let i=0;i<6;i++) state.players.push({ id: uid(), name: `Racer ${i+1}`, emoji: em[i%em.length] });
        }

        state.race.racers = state.players.map((p, i) => {
            const r = {
                id: p.id,
                name: p.name,
                emoji: p.emoji,
                // kinematics
                x: W * 0.12,
                y: 0,
                v: 0,                    // instantaneous velocity
                vTarget: 0,              // desired (pre-momentum) velocity
                // personality
                talent: rand(0.9, 1.1),  // innate pace multiplier
                bias: (Math.random()*2 - 1) * 20, // subtle personal bias +/- px/sec
                // avatar
                img: null, imgReady: false,
                // surge
                surgeMsLeft: 0
            };
            if (p.imgUrl) {
                const img = new Image();
                img.onload = () => { r.imgReady = true; };
                img.src = p.imgUrl;
                r.img = img;
            }
            return r;
        });

        placeRacersEvenly();
    }


    function placeRacersEvenly() {
        const n = state.race.racers.length;
        const top = H * 0.20, bot = H * 0.80;
        for (let i=0;i<n;i++) {
            const t = (i + 0.5) / n;
            state.race.racers[i].y = lerp(top, bot, t);
        }
    }

    /* ---------- Track rendering ---------- */
    function drawTrack(camX) {
        // Asphalt
        const g = ctx.createLinearGradient(0, H*0.18, 0, H*0.82);
        g.addColorStop(0, '#1a1f29');
        g.addColorStop(1, '#0f131a');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);

        // Dashed horizontal stripes (scroll left)
        const dashLen = 56, gap = 34, cycle = dashLen + gap;
        const off = ((camX * state.settings.stripeSpeed) % cycle);
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(255,255,255,0.75)';
        ctx.setLineDash([dashLen, gap]);
        ctx.lineDashOffset = off;

        const rows = 5; // number of dashed lines across the track area
        for (let i=1; i<rows; i++) {
            const y = lerp(H*0.2, H*0.8, i/rows);
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
        }
        ctx.setLineDash([]);

        // Dotted borders above & below (scroll slower for depth)
        const dotGap = 16;
        const bOff = -((camX * state.settings.borderSpeed) % dotGap);
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        for (let x = bOff; x < W; x += dotGap) {
            ctx.fillRect(x, H*0.18, 3, 3);
            ctx.fillRect(x, H*0.82, 3, 3);
        }

        // Finish band (checker-ish)
        const finishX = W * (1 - state.settings.finishPctFromRight/100);
        ctx.fillStyle = '#e3e4ea';
        ctx.fillRect(finishX, H*0.18, 6, H*0.64);
        // Shadow on the right side for contrast
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fillRect(finishX + 6, H*0.18, 8, H*0.64);
    }

    /* ---------- Racer rendering ---------- */
    function drawRacer(r, tMs) {
        // subtle bob + sideways shimmy to sell motion
        const bob = Math.sin((tMs * 0.006) + r.y * 0.02) * 4;
        const shim = Math.sin((tMs * 0.004) + r.y * 0.015) * 8 * state.settings.chaos;
        const x = r.x + shim;
        const y = r.y + bob;

        // shadow
        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        ctx.beginPath(); ctx.ellipse(x, y + 16, 28, 10, 0, 0, Math.PI*2); ctx.fill();

        if (r.img && r.imgReady) {
            const sz = 56;
            // rounded rect avatar
            roundImage(r.img, x - sz/2, y - sz/2, sz, sz, 12);
        } else {
            // fallback emoji “car”
            const w = 84, h = 30, rad = 12;
            ctx.fillStyle = '#40d0a8';
            ctx.strokeStyle = '#2e8f79';
            ctx.lineWidth = 2;
            roundRect(x - w/2, y - h/2, w, h, rad, true, true);

            // wheels
            ctx.fillStyle = '#05070b';
            ctx.beginPath(); ctx.arc(x - w*0.28, y + h*0.54, 8, 0, Math.PI*2); ctx.fill();
            ctx.beginPath(); ctx.arc(x + w*0.28, y + h*0.54, 8, 0, Math.PI*2); ctx.fill();

            // emoji badge or initials
            ctx.font = '16px system-ui, Apple Color Emoji, Segoe UI Emoji';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#000';
            ctx.fillText(r.emoji || '🟣', x, y - 2);
        }
    }

    function roundRect(x,y,w,h,r, fill=true, stroke=false) {
        const rr = Math.min(r, w/2, h/2);
        ctx.beginPath();
        ctx.moveTo(x+rr, y);
        ctx.lineTo(x+w-rr, y);
        ctx.quadraticCurveTo(x+w, y, x+w, y+rr);
        ctx.lineTo(x+w, y+h-rr);
        ctx.quadraticCurveTo(x+w, y+h, x+w-rr, y+h);
        ctx.lineTo(x+rr, y+h);
        ctx.quadraticCurveTo(x, y+h, x, y+h-rr);
        ctx.lineTo(x, y+rr);
        ctx.quadraticCurveTo(x, y, x+rr, y);
        if (fill) ctx.fill();
        if (stroke) ctx.stroke();
    }

    function roundImage(img, x, y, w, h, r) {
        ctx.save();
        const rr = Math.min(r, w/2, h/2);
        ctx.beginPath();
        ctx.moveTo(x+rr, y);
        ctx.lineTo(x+w-rr, y);
        ctx.quadraticCurveTo(x+w, y, x+w, y+rr);
        ctx.lineTo(x+w, y+h-rr);
        ctx.quadraticCurveTo(x+w, y+h, x+w-rr, y+h);
        ctx.lineTo(x+rr, y+h);
        ctx.quadraticCurveTo(x, y+h, x, y+h-rr);
        ctx.lineTo(x, y+rr);
        ctx.quadraticCurveTo(x, y, x+rr, y);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, x, y, w, h);
        ctx.restore();
    }

    /* ---------- Physics / progression ---------- */
    function updateRacers(dt, tMs) {
        const s = state.settings;
        const finishX = W * (1 - s.finishPctFromRight / 100);

        // find current phase
        const raceTime = (tMs / 1000);
        const phase = state.race.phases.find(p => raceTime >= p.start && raceTime < p.end) || { favored: null };

        // leader & pack stats
        let leaderX = 0;
        for (const r of state.race.racers) leaderX = Math.max(leaderX, r.x);

        // fatigue factor: later in the race, slightly lower the base "make it" pace
        const fatigue = 1 - s.fatigueCurve * (raceTime / s.durationSec);

        // target pack time left to finish (avoid divide-by-zero)
        const timeLeft = Math.max(0.25, s.durationSec - raceTime);

        // precompute nearest-ahead for slipstream
        const sorted = [...state.race.racers].sort((a,b)=>a.x-b.x);
        const aheadOf = new Map();
        for (let i=0;i<sorted.length;i++){
            const me = sorted[i];
            aheadOf.set(me.id, sorted[i+1] || null);
        }

        for (const r of state.race.racers) {
            // base pace to arrive on time (with fatigue)
            const dist = Math.max(0, finishX - r.x);
            const baseNeeded = dist / timeLeft;  // px/sec
            let v = baseNeeded * fatigue;

            // innate differences and personal bias
            v = v * r.talent + r.bias;

            // chaos wobble (tiny continuous noise)
            v += Math.sin((tMs * 0.004) + r.y * 0.02) * 18 * s.chaos;

            // phase favor boost
            if (phase.favored && r.id === phase.favored) {
                v += s.phaseFavorBoost;
            }

            // rubber band: gap to leader gives help; leader gets drag
            const gap = leaderX - r.x;
            v += gap * s.rubber * 0.9;          // help trailers
            if (r.x >= leaderX - 1) v -= s.dragAhead; // drag leader a bit

            // slipstream: if you're close behind someone, get a small boost
            const ahead = aheadOf.get(r.id);
            if (ahead) {
                const dx = ahead.x - r.x;
                if (dx > 22 && dx < 120 && Math.abs(ahead.y - r.y) < 30) {
                    v += s.slipstreamBoost * (1 - (dx-22)/(120-22)); // closer → more boost
                }
            }

            // occasional surge / slowdowns
            if (r.surgeMsLeft > 0) {
                v += s.surgeBoost;
                r.surgeMsLeft -= dt * 1000;
            } else if (Math.random() < s.surgeChance * dt) {
                r.surgeMsLeft = 480 + Math.random()*200; // ~0.5s surge
            }

            // clamp & momentum smoothing
            r.vTarget = clamp(v, 40, 900);
            r.v = lerp(r.v, r.vTarget, 1 - s.momentum); // low-pass filter

            // integrate position
            r.x += r.v * dt;

            // finish check
            if (r.x >= finishX && !state.race.winner) {
                r.x = finishX;
                state.race.winner = r;
                endRace();
            }
        }
    }


    /* ---------- Animation loop ---------- */
    function frame(ts) {
        if (!state.race.running) return;
        const tMs = ts - state.race.startMs;
        const dt = Math.min(0.05, (state._lastTs ? (ts - state._lastTs)/1000 : 0.016));
        state._lastTs = ts;

        // advance camera for parallax speeds
        state.race.camX += state.settings.baseSpeed * dt;

        // draw
        ctx.clearRect(0,0,W,H);
        drawTrack(state.race.camX);
        updateRacers(dt, tMs);
        for (const r of state.race.racers) drawRacer(r, tMs);

        state.race.raf = requestAnimationFrame(frame);
    }

    /* ---------- Race control ---------- */
    function startRace() {
        ensureCanvas();
        resizeCanvas();
        state.race.running = false;
        cancelAnimationFrame(state.race.raf);

        state.race.startMs = nowMs();
        state.race.camX = 0;
        state.race.winner = null;
        state._lastTs = 0;

        if (winnerOverlay) winnerOverlay.style.display = 'none';
        buildRacers();
        buildRaceScript();

        state.race.running = true;
        state.race.raf = requestAnimationFrame(frame);
    }

    function endRace() {
        state.race.running = false;
        cancelAnimationFrame(state.race.raf);
        if (winnerOverlay && state.race.winner) {
            winnerNameEl && (winnerNameEl.textContent = state.race.winner.name);
            winnerOverlay.style.display = 'flex';
        }
    }

    function resetRace() {
        state.race.running = false;
        cancelAnimationFrame(state.race.raf);
        state.race.winner = null;
        if (winnerOverlay) winnerOverlay.style.display = 'none';
        if (ctx) { ctx.clearRect(0,0,W,H); drawTrack(0); }
    }

    /* ---------- Public API ---------- */
    window.CanvasRacer = {
        start: startRace,
        reset: resetRace,
        // optional helpers:
        addPlayer,                 // addPlayer(name, localUrl)
        addPlayersFromFiles        // addPlayersFromFiles(FileList)
    };

    /* ---------- Auto-run guard (optional) ----------
       If you want it to start when the page is ready, uncomment:
       window.addEventListener('load', () => CanvasRacer.start());
     ------------------------------------------------- */

})();
