// ===== State =====
const state = {
    settings: {
        title: 'Giveaway Grand Prix',
        logoUrl: '',
        durationSec: 35,
        finishPctFromRight: 12,
        chaos: 0.6,
        rubber: 0.7,
        fxAll: 'off',   // 'off' | 'roll' | 'floaty' | 'wheelie'
        leadPhases: 3,
        // banners
        bannerTopUrl: '', bannerTopH: 10,
        bannerBotUrl: '', bannerBotH: 10,
        // avatar pool
        pool: {
            mode: 'emotes',          // 'emotes' | 'images'
            emotes: ['🦆', '🏎️', '🟣', '🚀', '🐢'],
            images: []               // object URLs (not exported)
        }
    },
    players: [
        {id: uid(), name: 'Player 1', motion: 'roll', imgUrl: ''},
        {id: uid(), name: 'Player 2', motion: 'floaty', imgUrl: ''},
        {id: uid(), name: 'Player 3', motion: 'wheelie', imgUrl: ''},
        {id: uid(), name: 'Player 4', motion: 'roll', imgUrl: ''},
        {id: uid(), name: 'Player 5', motion: 'floaty', imgUrl: ''}
    ],
    race: {running: false, rafId: 0, racers: [], phases: [], startTs: 0, winner: null}
};

// ===== DOM =====
const elLogo = document.getElementById('logo');
const elTitle = document.getElementById('title');
const track = document.getElementById('track');
const finishLine = track.querySelector('.finish-line');
const podiumBox = document.getElementById('podium');
const bannerTop = document.getElementById('bannerTop');
const bannerTopImg = document.getElementById('bannerTopImg');
const bannerBottom = document.getElementById('bannerBottom');
const bannerBottomImg = document.getElementById('bannerBottomImg');
const bannerOverlay = document.getElementById('winnerBanner');
const winnerNameEl = document.getElementById('winnerName');

// Settings modal controls
const modal = document.getElementById('modalBackdrop');
const inpTitle = document.getElementById('inpTitle');
const inpLogo = document.getElementById('inpLogo');
const inpDuration = document.getElementById('inpDuration');
const inpFinishPct = document.getElementById('inpFinishPct');
const inpChaos = document.getElementById('inpChaos');
const inpRubber = document.getElementById('inpRubber');
const inpFxAll = document.getElementById('inpFxAll');
const inpLeadPhases = document.getElementById('inpLeadPhases');

const inpBannerTop = document.getElementById('inpBannerTop');
const inpTopH = document.getElementById('inpTopH');
const inpBannerBottom = document.getElementById('inpBannerBottom');
const inpBotH = document.getElementById('inpBotH');

const inpPoolMode = document.getElementById('inpPoolMode');
const inpEmotes = document.getElementById('inpEmotes');
const inpPoolImages = document.getElementById('inpPoolImages');
const btnApplyPool = document.getElementById('btnApplyPool');

const inpNames = document.getElementById('inpNames');
const btnLoadNames = document.getElementById('btnLoadNames');
const btnExportNames = document.getElementById('btnExportNames');
const btnCopyNames = document.getElementById('btnCopyNames');

const list = document.getElementById('playerList');
const btnAddPlayer = document.getElementById('btnAddPlayer');
const btnClearPlayers = document.getElementById('btnClearPlayers');

const btnExportConfig = document.getElementById('btnExportConfig');
const btnImportConfig = document.getElementById('btnImportConfig');
const inpImportConfig = document.getElementById('inpImportConfig');

// Header buttons
document.getElementById('btnSettings').onclick = openSettings;
document.getElementById('btnStart').onclick = startRace;
document.getElementById('btnReset').onclick = resetRace;

document.getElementById('btnClose').onclick = () => modal.style.display = 'none';
document.getElementById('btnSave').onclick = saveSettings;

// Names
btnLoadNames.onclick = () => {
    const names = lines(inpNames.value);
    if (!names.length) return;
    state.players = names.map((n, i) => ({
        id: uid(),
        name: n,
        motion: ['roll', 'floaty', 'wheelie'][i % 3],
        imgUrl: ''
    }));
    renderPlayerRows();
    layoutTrack();
};
btnExportNames.onclick = () => downloadTxt('names.txt', state.players.map(p => p.name).join('\n'));
btnCopyNames.onclick = async () => {
    await navigator.clipboard.writeText(state.players.map(p => p.name).join('\n'));
    toast('Copied names to clipboard');
};

// Players
btnAddPlayer.onclick = () => {
    state.players.push({id: uid(), name: `Player ${state.players.length + 1}`, motion: 'roll', imgUrl: ''});
    renderPlayerRows();
    layoutTrack();
};
btnClearPlayers.onclick = () => {
    if (confirm('Clear all players?')) {
        state.players = [];
        renderPlayerRows();
        layoutTrack();
    }
};

// Config export/import (NO images in file)
btnExportConfig.onclick = () => {
    const cfg = {
        version: 1,
        settings: {
            title: state.settings.title,
            durationSec: state.settings.durationSec,
            finishPctFromRight: state.settings.finishPctFromRight,
            chaos: state.settings.chaos,
            rubber: state.settings.rubber,
            fxAll: state.settings.fxAll,
            leadPhases: state.settings.leadPhases,
            bannerTopH: state.settings.bannerTopH,
            bannerBotH: state.settings.bannerBotH,
            pool: {mode: state.settings.pool.mode, emotes: state.settings.pool.emotes.slice()} // images intentionally omitted
        },
        players: state.players.map(p => ({name: p.name, motion: p.motion})) // no imgUrl
    };
    downloadJson('race-config.json', cfg);
};


// ---- DEBUG helpers (put near your other utils) ----
window.RACER_DEBUG = window.RACER_DEBUG ?? false; // turn on in console: window.RACER_DEBUG = true
const DBG = (...a) => {
    if (window.RACER_DEBUG) console.log('[Import]', ...a);
};
const DBGG = (label, fn) => {
    if (window.RACER_DEBUG) {
        console.groupCollapsed('[Import]', label);
        try {
            fn();
        } finally {
            console.groupEnd();
        }
    } else {
        try {
            fn();
        } catch (e) { /* no-op */
        }
    }
};

function safeJSON(text) {
    // Trim BOM + whitespace to avoid "Unexpected token" on some editors
    const clean = String(text).replace(/^\uFEFF/, '').trim();
    return JSON.parse(clean);
}

function validateConfigShape(cfg) {
    const errors = [], warnings = [];
    if (!cfg || typeof cfg !== 'object') errors.push('Top-level is not an object.');
    if (!cfg.settings || typeof cfg.settings !== 'object') errors.push('Missing "settings" object.');
    if (!('players' in cfg)) errors.push('Missing "players" property.');
    if (cfg.players && !Array.isArray(cfg.players)) errors.push('"players" is not an array.');
    if (Array.isArray(cfg.players)) {
        const bad = cfg.players.filter(p => !p || typeof p !== 'object');
        if (bad.length) errors.push(`${bad.length} player entries are not objects.`);
        const unnamed = cfg.players.filter(p => !p || typeof p.name !== 'string');
        if (unnamed.length) warnings.push(`${unnamed.length} players missing valid "name" — will auto-name.`);
    }
    // settings checks (non-fatal -> warnings)
    if (cfg.settings && typeof cfg.settings.durationSec !== 'number') warnings.push('settings.durationSec is not a number (will default).');
    if (cfg.settings && typeof cfg.settings.finishPctFromRight !== 'number') warnings.push('settings.finishPctFromRight is not a number (will default).');
    return {errors, warnings};
}


// ---- Import handler (replace your existing one with this) ----
btnImportConfig.onclick = () => inpImportConfig.click();
inpImportConfig.onchange = async (e) => {
    const f = e.target.files?.[0];
    if (!f) {
        DBG('No file selected');
        return;
    }

    const t0 = performance.now();
    DBGG('Begin import', () => {
        DBG('File:', {name: f.name, size: f.size, type: f.type});
    });

    try {
        const raw = await f.text();
        DBGG('Raw first 200 chars', () => {
            DBG(raw.slice(0, 200));
        });

        let cfg;
        try {
            cfg = safeJSON(raw);
        } catch (parseErr) {
            console.error('[Import] JSON parse error:', parseErr);
            alert('Could not parse JSON. See console for details.');
            return;
        }

        // Validate + log omitted for brevity…

        // Apply settings
        const s = cfg.settings || {};
        state.settings.title = s.title ?? state.settings.title;
        state.settings.durationSec = num(s.durationSec, state.settings.durationSec);
        state.settings.finishPctFromRight = num(s.finishPctFromRight, state.settings.finishPctFromRight);
        state.settings.chaos = num(s.chaos, state.settings.chaos);
        state.settings.rubber = num(s.rubber, state.settings.rubber);
        state.settings.fxAll = s.fxAll ?? state.settings.fxAll;
        state.settings.leadPhases = num(s.leadPhases, state.settings.leadPhases);
        state.settings.bannerTopH = num(s.bannerTopH, state.settings.bannerTopH);
        state.settings.bannerBotH = num(s.bannerBotH, state.settings.bannerBotH);

        if (s.pool) {
            state.settings.pool.mode = s.pool.mode ?? state.settings.pool.mode ?? 'emotes';
            state.settings.pool.emotes = Array.isArray(s.pool.emotes) && s.pool.emotes.length
                ? s.pool.emotes.slice()
                : ['🦆', '🏎️', '🟣', '🚀', '🐢'];
        }

        // Apply players
        const importedPlayers = Array.isArray(cfg.players) ? cfg.players : [];
        state.players = importedPlayers.map((p, i) => ({
            id: uid(),
            name: (p && typeof p.name === 'string' && p.name.trim()) ? p.name.trim() : `Player ${i + 1}`,
            motion: (p && typeof p.motion === 'string' && ['roll', 'floaty', 'wheelie'].includes(p.motion)) ? p.motion : 'roll',
            imgUrl: ''
        }));

        // Assign avatars from current pool
        randomAssignFromPool(true);

        // 🔽🔽🔽 EXACTLY HERE — keep inputs in sync if modal is open 🔽🔽🔽
        syncSettingsFormFromState();
        // 🔼🔼🔼

        // Refresh UI
        applyHeader();
        renderPlayerRows();
        layoutTrack();
        applyBanners();
        syncSettingsFormFromState();
        setViewportVars();

        const t1 = performance.now();
        toast(`Config loaded (${state.players.length} players) in ${(t1 - t0).toFixed(1)} ms`);

    } catch (err) {
        console.error('[Import] Unexpected error:', err);
        alert('Import failed. See console for details.');
    } finally {
        e.target.value = '';
    }
};


// Avatar pool
inpPoolMode.onchange = () => state.settings.pool.mode = inpPoolMode.value;
btnApplyPool.onclick = () => {
    randomAssignFromPool(true);
    layoutTrack();
};

// Emote list live update
inpEmotes.oninput = () => {
    state.settings.pool.emotes = lines(inpEmotes.value).length ? lines(inpEmotes.value) : ['🦆', '🏎️', '🟣', '🚀', '🐢'];
};

// Image pool upload -> object URLs (not exported)
inpPoolImages.onchange = () => {
    // Revoke old URLs
    state.settings.pool.images.forEach(u => {
        if (String(u).startsWith('blob:')) {
            try {
                URL.revokeObjectURL(u)
            } catch {
            }
        }
    });
    state.settings.pool.images = [...(inpPoolImages.files || [])].map(f => URL.createObjectURL(f));
    toast(`Loaded ${state.settings.pool.images.length} image(s) into pool`);
};

// Logo / banners inputs
inpLogo.onchange = ()=> {
    const f = inpLogo.files?.[0];
    if (!f) return;
    // use object URL so we can revoke later if you want
    revoke(state.settings.logoUrl);
    state.settings.logoUrl = URL.createObjectURL(f);
    applyHeader(); // will show it
};


inpBannerTop.onchange = () => {
    const f = inpBannerTop.files?.[0];
    if (f) {
        revoke(state.settings.bannerTopUrl);
        state.settings.bannerTopUrl = URL.createObjectURL(f);
        applyBanners();
    }
};
inpBannerBottom.onchange = () => {
    const f = inpBannerBottom.files?.[0];
    if (f) {
        revoke(state.settings.bannerBotUrl);
        state.settings.bannerBotUrl = URL.createObjectURL(f);
        applyBanners();
    }
};
inpTopH.oninput = () => {
    state.settings.bannerTopH = clamp(num(inpTopH.value, 10), 0, 40);
    applyBanners();
};
inpBotH.oninput = () => {
    state.settings.bannerBotH = clamp(num(inpBotH.value, 10), 0, 40);
    applyBanners();
};

// Save settings
function saveSettings() {
    state.settings.title = (inpTitle.value || 'Giveaway Grand Prix').slice(0, 120);
    state.settings.durationSec = clamp(num(inpDuration.value, 35), 5, 600);
    state.settings.finishPctFromRight = clamp(num(inpFinishPct.value, 12), 2, 30);
    state.settings.chaos = clamp(parseFloat(inpChaos.value || '0.6'), 0, 1);
    state.settings.rubber = clamp(parseFloat(inpRubber.value || '0.7'), 0, 1);
    state.settings.fxAll = inpFxAll.value;
    state.settings.leadPhases = clamp(num(inpLeadPhases.value, 3), 1, 10);
    state.settings.pool.mode = inpPoolMode.value;
    state.settings.pool.emotes = lines(inpEmotes.value).length ? lines(inpEmotes.value) : ['🦆', '🏎️', '🟣', '🚀', '🐢'];
    applyHeader();
    layoutTrack();
    applyBanners();
    modal.style.display = 'none';
    setViewportVars();

}

function openSettings_old() {
    inpTitle.value = state.settings.title;
    inpDuration.value = state.settings.durationSec;
    inpFinishPct.value = state.settings.finishPctFromRight;
    inpChaos.value = state.settings.chaos;
    inpRubber.value = state.settings.rubber;
    inpFxAll.value = state.settings.fxAll;
    inpLeadPhases.value = state.settings.leadPhases;
    inpTopH.value = state.settings.bannerTopH;
    inpBotH.value = state.settings.bannerBotH;
    inpPoolMode.value = state.settings.pool.mode;
    inpEmotes.value = state.settings.pool.emotes.join('\n');
    renderPlayerRows();
    modal.style.display = 'grid';
}

function openSettings() {
    syncSettingsFormFromState();
    renderPlayerRows();
    modal.style.display = 'grid';
}

// ===== Utilities =====
function uid() {
    return Math.random().toString(36).slice(2, 9);
}

function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
}

function num(v, def) {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : def;
}

function lines(s) {
    return (s || '').split(/\r?\n/).map(x => x.trim()).filter(Boolean);
}

function revoke(url) {
    if (url && String(url).startsWith('blob:')) {
        try {
            URL.revokeObjectURL(url)
        } catch {
        }
    }
}

function downloadTxt(name, text) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], {type: 'text/plain'}));
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function downloadJson(name, obj) {
    downloadTxt(name, JSON.stringify(obj, null, 2));
}

function toast(msg) {
    console.log('[Racer]', msg);
}

// ===== Header & Banners =====
function applyHeader() {
    elTitle.textContent = state.settings.title;
    if (state.settings.logoUrl) {
        elLogo.src = state.settings.logoUrl;
        elLogo.style.display = ''
    } else {
        elLogo.removeAttribute('src');
        elLogo.style.display = 'none';
    }
}

function applyBanners() {
    bannerTop.style.setProperty('--banner-h', state.settings.bannerTopH);
    bannerBottom.style.setProperty('--banner-h', state.settings.bannerBotH);
    if (state.settings.bannerTopUrl) {
        bannerTopImg.src = state.settings.bannerTopUrl;
        bannerTopImg.style.display = '';
    } else {
        bannerTopImg.removeAttribute('src');
        bannerTopImg.style.display = 'none';
    }
    if (state.settings.bannerBotUrl) {
        bannerBottomImg.src = state.settings.bannerBotUrl;
        bannerBottomImg.style.display = '';
    } else {
        bannerBottomImg.removeAttribute('src');
        bannerBottomImg.style.display = 'none';
    }

    setViewportVars();

}

// ===== Players UI =====
function renderPlayerRows() {
    list.innerHTML = '';
    state.players.forEach((p, idx) => {
        const row = document.createElement('div');
        row.className = 'player-row';
        row.dataset.pid = p.id;
        const cIdx = document.createElement('div');
        cIdx.textContent = String(idx + 1);

        const cName = document.createElement('input');
        cName.type = 'text';
        cName.placeholder = 'Player name';
        cName.value = p.name;
        cName.oninput = () => p.name = cName.value.slice(0, 80);

        const cAvatarWrap = document.createElement('div');
        const thumb = document.createElement('img');
        thumb.alt = 'avatar';
        thumb.src = p.imgUrl || '';
        cAvatarWrap.appendChild(thumb);
        const file = document.createElement('input');
        file.type = 'file';
        file.accept = 'image/*';
        file.onchange = () => {
            const f = file.files?.[0];
            if (f) {
                revoke(p.imgUrl);
                p.imgUrl = URL.createObjectURL(f);
                thumb.src = p.imgUrl;
            }
        };
        cAvatarWrap.appendChild(file);

        const cMotion = document.createElement('select');
        ['roll', 'floaty', 'wheelie'].forEach(m => {
            const o = document.createElement('option');
            o.value = m;
            o.textContent = m;
            if (m === p.motion) o.selected = true;
            cMotion.appendChild(o);
        });
        cMotion.onchange = () => p.motion = cMotion.value;
        if (state.settings.fxAll !== 'off') cMotion.disabled = true;

        const cRemove = document.createElement('button');
        cRemove.textContent = '✕';
        cRemove.className = 'danger';
        cRemove.onclick = () => {
            state.players.splice(idx, 1);
            renderPlayerRows();
            layoutTrack();
        };

        row.append(cIdx, cName, cAvatarWrap, cMotion, cRemove);
        list.appendChild(row);
    });
}

// ===== Track build =====
function layoutTrack() {
    // lanes
    [...track.querySelectorAll('.lane')].forEach(n => n.remove());
    finishLine.style.right = `${clamp(state.settings.finishPctFromRight, 2, 30)}%`;

    const laneCount = Math.max(1, state.players.length);
    track.style.height = `calc( ${laneCount} * var(--lane-height) + ${(laneCount + 1)} * var(--lane-gap) )`;

    state.players.forEach((p, i) => {
        const lane = document.createElement('div');
        lane.className = 'lane';
        lane.dataset.pid = p.id;

        // Let labels render outside the lane box and add headroom
        lane.style.overflow = 'visible';
        lane.style.paddingTop = '14px';

        const racer = document.createElement('div');
        racer.className = 'racer';
        racer.dataset.pid = p.id;

        const img = document.createElement('img');
        img.className = 'avatar';
        img.alt = p.name || 'player';

        const styleClass = state.settings.fxAll === 'off' ? (p.motion || 'roll') : state.settings.fxAll;
        img.classList.add(styleClass);
        img.src = p.imgUrl || placeholderFor(styleClass);

        const nameplate = document.createElement('div');
        nameplate.className = 'nameplate';
        nameplate.textContent = p.name || 'Anon';
        styleNameplate(nameplate); // ← ensure full visibility/readability

        racer.appendChild(img);
        racer.appendChild(nameplate);
        lane.appendChild(racer);
        track.appendChild(lane);
    });

}

// Transparent emoji rendered to canvas → dataURL
function placeholderFor(motion) {
    const emoji = motion === 'roll' ? '🟣' : motion === 'floaty' ? '🦆' : '🏎️';
    const c = document.createElement('canvas');
    const s = 128;
    c.width = s;
    c.height = s;
    const ctx = c.getContext('2d');
    // transparent canvas (no fill)
    ctx.font = '96px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, s / 2, s / 2);
    return c.toDataURL();
}

// ===== Race engine =====
function startRace() {
    if (state.race.running) return;
    if (state.players.length < 2) {
        alert('Add at least 2 players.');
        return;
    }
    applyHeader();
    layoutTrack();
    applyBanners();

    const lanes = [...track.querySelectorAll('.lane')];
    const trackRect = track.getBoundingClientRect();
    const finishX = trackRect.width * (1 - clamp(state.settings.finishPctFromRight, 2, 30) / 100);
    const expectedFrames = state.settings.durationSec * 60;

    // build racers
    state.race.racers = state.players.map((p, i) => {
        const node = lanes[i].querySelector('.racer');
        const img = node.querySelector('.avatar');
        node.style.left = '0px';
        return {
            id: p.id,
            name: p.name || `Player ${i + 1}`,
            motion: (state.settings.fxAll === 'off' ? p.motion : state.settings.fxAll),
            node,
            laneNode: lanes[i],
            x: 0,
            prevX: 0,
            vBase: rand(1.10, 1.55),
            vSkill: rand(0.94, 1.06),
            noiseT: Math.random() * 1000,
            finished: false,
            finishOrder: 0
        };
    });

    // plan phases for visible lead changes
    state.race.phases = planLeadPhases(state.race.racers.map(r => r.id), expectedFrames, state.settings.leadPhases);
    state.race.running = true;
    state.race.startTs = performance.now();
    state.race.winner = null;
    podiumBox.style.display = 'none';
    bannerOverlay.style.display = 'none';
    lanesRemoveWinner();

    let frame = 0, order = 0;

    function tick(ts) {
        frame++;
        const rs = state.race.racers;
        const leaderX = Math.max(...rs.map(r => r.x));
        const tailX   = Math.min(...rs.map(r => r.x));
        const spread  = Math.max(1, leaderX - tailX);
        const favored = currentFavoredId(state.race.phases, frame);
        const chaos   = clamp(Math.max(0, state.settings.chaos), 0, 1);
        const rubber  = clamp(Math.max(0, state.settings.rubber), 0, 1);

        // small helpers local to tick (keeps this snippet self-contained)
        const lerp = (a,b,t)=> a + (b-a)*t;
        const clamp01 = x => Math.max(0, Math.min(1, x));

        // tuning derived from sliders
        const noiseAmp        = lerp(0.02, 0.18, chaos);
        const burstEPM        = lerp(  2,  20, chaos);  // events per minute
        const brakeEPM        = lerp(  1,  14, chaos);
        const pBurst          = burstEPM / (60*60);     // ~60 fps
        const pBrake          = brakeEPM / (60*60);
        const burstMag        = lerp(0.30, 2.50, chaos);
        const brakeMag        = lerp(0.20, 1.80, chaos);

        const catchUpMax      = lerp(0.00, 0.65, rubber);
        const catchUpPow      = lerp(1.40, 0.85, rubber);
        const leaderNerfMax   = lerp(0.00, 0.10, rubber);
        const endPackTighten  = lerp(0.00, 0.60, rubber);

        // randomize update order to avoid bias
        const idxs = rs.map((_, i) => i);
        for (let i = idxs.length - 1; i > 0; i--) {
            const j = (Math.random() * (i + 1)) | 0;
            [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
        }

        const finishedThisFrame = [];

        for (const k of idxs) {
            const r = rs[k];
            if (r.finished) continue;
            r.prevX = r.x;

            // baseline to hit duration
            const targetV = (finishX / expectedFrames);

            // pack-relative position 0..1 (1 = farthest behind)
            const behind = spread > 1 ? (leaderX - r.x) / spread : 0;

            // smoothed wobble
            r.noiseT += 0.013 + Math.random() * 0.01;
            const smoothNoise = (Math.sin(r.noiseT*2.1) + Math.cos(r.noiseT*1.3)) * 0.5; // -1..1

            // random events
            let burst = 0, brake = 0;
            if (Math.random() < pBurst) burst = targetV * rand(0.5, 1) * burstMag;
            if (Math.random() < pBrake) brake = targetV * rand(0.5, 1) * brakeMag;

            // phase favoritism (kept from your original)
            const phaseBoost = (favored && r.id === favored) ? 0.2 : 0;

            // catch-up (nonlinear) & leader nerf
            const catchUp   = Math.pow(clamp01(behind), catchUpPow) * catchUpMax;
            const isLeader  = (leaderX - r.x) < (0.10 * Math.max(1, spread));
            const leaderNerf = isLeader ? leaderNerfMax : 0;

            // compose velocity
            let v = targetV
                * r.vBase * r.vSkill
                * (1 + (smoothNoise * noiseAmp) + catchUp + phaseBoost - leaderNerf);

            v += burst;
            v -= brake;

            // fair-finish guard (gentler; respects sliders)
            const gateX = finishX * 0.92;
            if (r.x >= gateX && !r.finished) {
                const within = rs.some(o => o !== r && Math.abs(o.x - r.x) <= finishX * (0.06 + 0.06*rubber));
                if (!within) {
                    const ease = lerp(0.3, 1.2, 1 - chaos) * (0.5 + 0.5*rubber);
                    v -= targetV * ease;
                }
            }

            // endgame pack tightening (subtle bunching near finish)
            const distLeft = Math.max(0, finishX - r.x);
            const tightenK = (distLeft < (finishX * 0.25)) ? (endPackTighten * (1 - distLeft/(finishX*0.25))) : 0;
            if (tightenK > 0 && rs.length >= 2){
                const localAvg = (leaderX + tailX) * 0.5;
                const pull = (localAvg - r.x) * 0.0009 * tightenK;
                v += pull;
            }

            // apply movement
            v = Math.max(v, targetV * 0.02); // don't stall
            r.x += v;

            // DOM update
            const px = Math.min(r.x, finishX - 2);
            r.node.style.left = `${px}px`;

            if (!r.finished && r.prevX < finishX && r.x >= finishX) {
                finishedThisFrame.push(r);
            }
        }

        // ==== THIS BLOCK PICKS THE WINNER ====
        // First time any racers cross finish this frame, we compute
        // who crossed *first* using fractional position within the frame.
        if (finishedThisFrame.length && !state.race.winner) {
            let first = null, bestFrac = Infinity;
            for (const r of finishedThisFrame) {
                const frac = (finishX - r.prevX) / Math.max(1e-6, (r.x - r.prevX));
                if (frac < bestFrac) { bestFrac = frac; first = r; }
            }
            if (first) state.race.winner = first;  // ← winner set here
        }

        // =====================================

        // finalize finish flags for everyone who crossed this frame
        if (finishedThisFrame.length) {
            finishedThisFrame.sort((a, b) => b.x - a.x);
            for (const r of finishedThisFrame) {
                if (!r.finished) { r.finished = true; r.finishOrder = ++order; }
            }
        }

        // stop condition: once winner exists and enough finishers or overtime
        if (state.race.winner) {
            if (order >= Math.ceil(rs.length * 0.35) || frame > expectedFrames + 240) {
                state.race.running = false;
                cancelAnimationFrame(state.race.rafId);
                showWinnerAndPodium(state.race.winner, finishX);
                return;
            }
        }

        state.race.rafId = requestAnimationFrame(tick);
    }


    state.race.rafId = requestAnimationFrame(tick);
}

function planLeadPhases(ids, frames, k) {
    if (!ids.length) return [];
    k = clamp(k, 1, Math.max(1, ids.length));
    const shuffled = ids.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const chosen = [];
    for (let i = 0; i < k; i++) chosen.push(shuffled[i % shuffled.length]);
    const seg = Math.floor(frames / (k + 1));
    const phases = [];
    for (let i = 0; i < k; i++) phases.push({start: i * seg, end: (i + 1) * seg - 1, id: chosen[i]});
    return phases;
}

function currentFavoredId(phases, frame) {
    for (const ph of phases) {
        if (frame >= ph.start && frame <= ph.end) return ph.id;
    }
    return null;
}

function showWinnerAndPodium(winner, finishX) {
    try {
        winner.laneNode.classList.add('winner');
        winnerNameEl.textContent = winner.name;
        bannerOverlay.style.display = 'grid';
        confettiBurst();

        // Podium: 1st = true crosser, 2nd/3rd by current x
        const rs = state.race.racers.slice().sort((a, b) => b.x - a.x);
        const podium = [winner.name];
        for (const r of rs) {
            if (r.id !== winner.id && podium.length < 3) podium.push(r.name);
            if (podium.length === 3) break;
        }
        podiumBox.innerHTML = `<div>🥇 ${podium[0] || ''}</div><div>🥈 ${podium[1] || ''}</div><div>🥉 ${podium[2] || ''}</div>`;
        podiumBox.style.display = 'block';
    } catch (e) {
        console.error(e);
    }
}

function lanesRemoveWinner() {
    [...track.querySelectorAll('.lane')].forEach(l => l.classList.remove('winner'));
}

function resetRace() {
    if (state.race.running) {
        cancelAnimationFrame(state.race.rafId);
        state.race.running = false;
    }
    lanesRemoveWinner();
    bannerOverlay.style.display = 'none';
    podiumBox.style.display = 'none';

    // Assign avatars from pool NOW (per your request)
    randomAssignFromPool(true);

    renderPlayerRows();
    layoutTrack();
}

function randomAssignFromPool(force = false) {
    const mode = state.settings.pool.mode;
    for (const p of state.players) {
        if (force || !p.imgUrl) {
            if (mode === 'images' && state.settings.pool.images.length) {
                p.imgUrl = pick(state.settings.pool.images);
            } else {
                const e = pick(state.settings.pool.emotes.length ? state.settings.pool.emotes : ['🦆', '🏎️', '🟣', '🚀', '🐢']);
                // render transparent emoji
                const c = document.createElement('canvas');
                const s = 128;
                c.width = s;
                c.height = s;
                const ctx = c.getContext('2d');
                ctx.font = '96px serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(e, s / 2, s / 2);
                p.imgUrl = c.toDataURL();
            }
        }
    }
}

function rand(a, b) {
    return a + Math.random() * (b - a);
}

function pick(arr) {
    return arr[(Math.random() * arr.length) | 0];
}

// ===== Confetti =====
function confettiBurst() {
    const N = 140, duration = 1600, parts = [];
    for (let i = 0; i < N; i++) {
        const d = document.createElement('div');
        d.style.position = 'fixed';
        d.style.left = (Math.random() * 100) + 'vw';
        d.style.top = '-2vh';
        d.style.width = '8px';
        d.style.height = (6 + Math.random() * 8) + 'px';
        d.style.background = `hsl(${(Math.random() * 360) | 0},90%,60%)`;
        d.style.opacity = '0.9';
        d.style.transform = `rotate(${(Math.random() * 360) | 0}deg)`;
        d.style.borderRadius = '2px';
        d.style.zIndex = '60';
        document.body.appendChild(d);
        parts.push({
            el: d,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (1.5 + Math.random() * 1.5),
            rot: (Math.random() - 0.5) * 14
        });
    }
    const t0 = performance.now();

    function step(ts) {
        const done = (ts - t0) > duration;
        for (const p of parts) {
            const r = p.el.getBoundingClientRect();
            p.el.style.left = (r.left + p.vx * 16) + 'px';
            p.el.style.top = (r.top + p.vy * 16) + 'px';
            p.el.style.transform += ` rotate(${p.rot}deg)`;
        }
        if (!done) requestAnimationFrame(step); else parts.forEach(p => p.el.remove());
    }

    requestAnimationFrame(step);
}


// ===== Helpers =====
function styleNameplate(el) {
    el.style.position = 'absolute';
    el.style.top = '-1.8em';          // above the avatar
    el.style.left = '50%';
    el.style.transform = 'translateX(-50%)';
    el.style.background = 'rgba(0,0,0,.7)';
    el.style.color = '#fff';
    el.style.padding = '2px 8px';
    el.style.borderRadius = '999px';
    el.style.fontWeight = '700';
    el.style.fontSize = 'clamp(11px, 1.8vh, 15px)';
    el.style.whiteSpace = 'nowrap';
    el.style.pointerEvents = 'none';
}

function syncSettingsFormFromState() {
    // settings → inputs
    inpTitle.value = state.settings.title;
    inpDuration.value = state.settings.durationSec;
    inpFinishPct.value = state.settings.finishPctFromRight;
    inpChaos.value = state.settings.chaos;
    inpRubber.value = state.settings.rubber;
    inpFxAll.value = state.settings.fxAll;
    inpLeadPhases.value = state.settings.leadPhases;

    inpTopH.value = state.settings.bannerTopH;
    inpBotH.value = state.settings.bannerBotH;
    inpPoolMode.value = state.settings.pool.mode;
    inpEmotes.value = (state.settings.pool.emotes || []).join('\n');

    // convenience: keep the names textarea in sync too
    if (inpNames) inpNames.value = state.players.map(p => p.name).join('\n');
}

function setViewportVars() {
    // Use real innerHeight to avoid mobile UI chrome issues
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    const header = document.querySelector('header');
    const headerH = header ? header.offsetHeight : 0;
    const topH = bannerTop ? bannerTop.offsetHeight : 0;
    const botH = bannerBottom ? bannerBottom.offsetHeight : 0;

    document.documentElement.style.setProperty('--header-h', `${headerH}px`);
    document.documentElement.style.setProperty('--stage-min-h', `calc(100vh - ${headerH}px - ${topH}px - ${botH}px)`);
}

function applyTuningLabels(){
    const lblChaos  = document.querySelector('label[for="inpChaos"]');
    const lblRubber = document.querySelector('label[for="inpRubber"]');
    if (lblChaos)  { lblChaos.textContent  = 'Random Events (0–1)'; lblChaos.title  = 'More boosts/brakes & wobble'; }
    if (lblRubber) { lblRubber.textContent = 'Catch-Up Assist (0–1)'; lblRubber.title = 'How strongly the back gets help'; }
}

const FPS = 60;
function lerp(a,b,t){ return a + (b-a)*t; }
function clamp01(x){ return Math.max(0, Math.min(1, x)); }

function getTuning(chaos, rubber){
    chaos  = clamp01(chaos);
    rubber = clamp01(rubber);

    // Randomness / events
    const noiseAmp = lerp(0.02, 0.18, chaos);      // wobble amplitude
    const burstEPM = lerp(  2,  20, chaos);        // bursts per racer per minute
    const brakeEPM = lerp(  1,  14, chaos);        // brakes per racer per minute
    const pBurst   = burstEPM / (60*FPS);
    const pBrake   = brakeEPM / (60*FPS);
    const burstMag = lerp(0.30, 2.50, chaos);      // × targetV
    const brakeMag = lerp(0.20, 1.80, chaos);

    // Catch-up
    const catchUpMax     = lerp(0.00, 0.65, rubber); // up to +65% boost in back
    const catchUpPow     = lerp(1.40, 0.85, rubber); // curve shape
    const leaderNerfMax  = lerp(0.00, 0.10, rubber); // up to -10% near front
    const endPackTighten = lerp(0.00, 0.60, rubber); // bunching near finish

    return { noiseAmp, pBurst, pBrake, burstMag, brakeMag, catchUpMax, catchUpPow, leaderNerfMax, endPackTighten };
}


// ===== Init =====
function init() {
    applyHeader();
    applyTuningLabels();
    applyBanners();
    renderPlayerRows();
    layoutTrack();
    resetRace();           // your existing first-assign
    setViewportVars();     // <-- compute stage height once everything is in the DOM
}

// keep finish line position and layout on resize
let rTimer = 0;
window.addEventListener('resize', () => {
    clearTimeout(rTimer);
    rTimer = setTimeout(() => {
        finishLine.style.right = `${clamp(state.settings.finishPctFromRight, 2, 30)}%`;
        setViewportVars();    // <-- recompute stage min-height on resize
    }, 100);
});

init();
