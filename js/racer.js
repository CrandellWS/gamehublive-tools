// ===== Themes & configuration =====
const DEFAULT_EMOTES = ['🦆', '🏎️', '🟣', '🚀', '🐢'];

const THEME_PRESETS = {
    'stream-default': {
        label: 'Stream Default',
        css: {
            '--bg': '#0b1220',
            '--bg-gradient': 'linear-gradient(180deg, #0b1220 0%, #0e1a35 100%)',
            '--panel': '#0f172a',
            '--text': '#e5e7eb',
            '--muted': '#94a3b8',
            '--accent': '#7c3aed',
            '--danger': '#ef4444',
            '--border': '#22304b',
            '--track-bg': '#0c1834',
            '--track-border': '#1e2a44',
            '--lane-bg': 'rgba(255, 255, 255, .05)',
            '--lane-border': '#22304b',
            '--lane-stripe-primary': 'rgba(255, 255, 255, .15)',
            '--lane-stripe-secondary': 'rgba(255, 255, 255, .08)',
            '--lane-stripe-width': '2px',
            '--lane-stripe-gap': '20px',
            '--lane-stripe-row': '16px'
        },
        lane: {
            background: 'rgba(255, 255, 255, .05)',
            border: '#22304b',
            stripePrimary: 'rgba(255, 255, 255, .15)',
            stripeSecondary: 'rgba(255, 255, 255, .08)',
            stripeWidth: '2px',
            stripeGap: '20px',
            stripeRow: '16px'
        },
        racers: {
            placeholders: { roll: '🟣', floaty: '🦆', wheelie: '🏎️' },
            emotes: DEFAULT_EMOTES
        },
        fxAll: 'off'
    },
    'cars': {
        label: 'Neon Speedway (Cars)',
        css: {
            '--bg': '#0d0b1f',
            '--bg-gradient': 'linear-gradient(180deg, #0d0b1f 0%, #1f0b3d 100%)',
            '--panel': '#110b2a',
            '--text': '#f8fafc',
            '--muted': '#cbd5f5',
            '--accent': '#f97316',
            '--danger': '#f43f5e',
            '--border': '#3b1965',
            '--track-bg': '#140b33',
            '--track-border': '#3b1965',
            '--lane-bg': 'rgba(249, 115, 22, 0.14)',
            '--lane-border': '#f97316',
            '--lane-stripe-primary': 'rgba(249, 115, 22, 0.7)',
            '--lane-stripe-secondary': 'rgba(249, 115, 22, 0.24)',
            '--lane-stripe-width': '3px',
            '--lane-stripe-gap': '26px',
            '--lane-stripe-row': '18px'
        },
        lane: {
            background: 'rgba(249, 115, 22, 0.14)',
            border: '#f97316',
            stripePrimary: 'rgba(249, 115, 22, 0.7)',
            stripeSecondary: 'rgba(249, 115, 22, 0.24)',
            stripeWidth: '3px',
            stripeGap: '26px',
            stripeRow: '18px'
        },
        racers: {
            placeholders: { roll: '🚗', floaty: '🚙', wheelie: '🏎️' },
            emotes: ['🏎️', '🚗', '🚙', '🚕', '🚘']
        },
        fxAll: 'wheelie'
    },
    'ducks': {
        label: 'Tidal Duck Pond',
        css: {
            '--bg': '#022c22',
            '--bg-gradient': 'linear-gradient(180deg, #022c22 0%, #0b5d69 100%)',
            '--panel': '#064e3b',
            '--text': '#ecfeff',
            '--muted': '#bae6fd',
            '--accent': '#22d3ee',
            '--danger': '#f97316',
            '--border': '#0f766e',
            '--track-bg': '#0f766e',
            '--track-border': '#0ea5e9',
            '--lane-bg': 'rgba(34, 211, 238, 0.18)',
            '--lane-border': '#0ea5e9',
            '--lane-stripe-primary': 'rgba(255, 255, 255, 0.35)',
            '--lane-stripe-secondary': 'rgba(14, 165, 233, 0.42)',
            '--lane-stripe-width': '2px',
            '--lane-stripe-gap': '18px',
            '--lane-stripe-row': '20px'
        },
        lane: {
            background: 'rgba(34, 211, 238, 0.18)',
            border: '#0ea5e9',
            stripePrimary: 'rgba(255, 255, 255, 0.35)',
            stripeSecondary: 'rgba(14, 165, 233, 0.42)',
            stripeWidth: '2px',
            stripeGap: '18px',
            stripeRow: '20px'
        },
        racers: {
            placeholders: { roll: '🟢', floaty: '🦆', wheelie: '🛶' },
            emotes: ['🦆', '🐤', '🦢', '🪿', '🐥']
        },
        fxAll: 'floaty'
    },
    'marbles': {
        label: 'Galaxy Marbles',
        css: {
            '--bg': '#0b1120',
            '--bg-gradient': 'linear-gradient(180deg, #0b1120 0%, #111827 100%)',
            '--panel': '#111827',
            '--text': '#e0f2fe',
            '--muted': '#a5b4fc',
            '--accent': '#60a5fa',
            '--danger': '#f87171',
            '--border': '#1f2937',
            '--track-bg': '#0f172a',
            '--track-border': '#2563eb',
            '--lane-bg': 'rgba(96, 165, 250, 0.18)',
            '--lane-border': '#2563eb',
            '--lane-stripe-primary': 'rgba(96, 165, 250, 0.55)',
            '--lane-stripe-secondary': 'rgba(59, 130, 246, 0.32)',
            '--lane-stripe-width': '2px',
            '--lane-stripe-gap': '22px',
            '--lane-stripe-row': '18px'
        },
        lane: {
            background: 'rgba(96, 165, 250, 0.18)',
            border: '#2563eb',
            stripePrimary: 'rgba(96, 165, 250, 0.55)',
            stripeSecondary: 'rgba(59, 130, 246, 0.32)',
            stripeWidth: '2px',
            stripeGap: '22px',
            stripeRow: '18px'
        },
        racers: {
            placeholders: { roll: '🔮', floaty: '🪐', wheelie: '🚀' },
            emotes: ['🔮', '🪐', '🌌', '🌠', '💫']
        },
        fxAll: 'roll'
    }
};

const DEFAULT_THEME_NAME = 'stream-default';

const RACER_EVENTS = createEventHub();
const emitEvent = RACER_EVENTS.emit;

// Expose subscription helpers immediately so overlays can listen ASAP
window.RacerEvents = {
    on: RACER_EVENTS.on,
    off: RACER_EVENTS.off,
    once: RACER_EVENTS.once
};

// ===== State =====
const state = {
    settings: {
        title: 'Giveaway Grand Prix',
        logoUrl: '',
        durationSec: 90,
        finishPctFromRight: 12,
        chaos: 0.6,
        rubber: 0.7,
        fxAll: 'off',   // 'off' | 'roll' | 'floaty' | 'wheelie'
        leadPhases: 3,
        theme: DEFAULT_THEME_NAME,
        themeConfig: null,
        // banners
        bannerTopUrl: '', bannerTopH: 10,
        bannerBotUrl: '', bannerBotH: 10,
        // avatar pool
        pool: {
            mode: 'emotes',          // 'emotes' | 'images'
            emotes: THEME_PRESETS[DEFAULT_THEME_NAME].racers.emotes.slice(),
            images: []               // object URLs (not exported)
        }
    },
    theme: resolveTheme(DEFAULT_THEME_NAME),
    players: [
        {id: uid(), name: 'Player 1', motion: 'roll', imgUrl: '', avatarEmoji: ''},
        {id: uid(), name: 'Player 2', motion: 'floaty', imgUrl: '', avatarEmoji: ''},
        {id: uid(), name: 'Player 3', motion: 'wheelie', imgUrl: '', avatarEmoji: ''},
        {id: uid(), name: 'Player 4', motion: 'roll', imgUrl: '', avatarEmoji: ''},
        {id: uid(), name: 'Player 5', motion: 'floaty', imgUrl: '', avatarEmoji: ''}
    ],
    race: {running: false, rafId: 0, racers: [], phases: [], startTs: 0, winner: null, lastLeaderId: null}
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
const inpTheme = document.getElementById('inpTheme');

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
        imgUrl: '',
        avatarEmoji: ''
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
    state.players.push({id: uid(), name: `Player ${state.players.length + 1}`, motion: 'roll', imgUrl: '', avatarEmoji: ''});
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
    const cfg = createConfigSnapshot();
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

function mergeThemeSections(base = {}, override = {}) {
    const result = {...(base || {})};
    if (!override) return result;
    for (const [key, value] of Object.entries(override)) {
        if (value === undefined) continue;
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            result[key] = mergeThemeSections(result[key] || {}, value);
        } else if (Array.isArray(value)) {
            result[key] = value.slice();
        } else {
            result[key] = value;
        }
    }
    return result;
}

function resolveTheme(themeValue) {
    let descriptor = null;
    let baseKey = DEFAULT_THEME_NAME;
    if (typeof themeValue === 'string' && themeValue) {
        baseKey = themeValue;
    } else if (themeValue && typeof themeValue === 'object') {
        descriptor = themeValue;
        baseKey = themeValue.extends || themeValue.base || themeValue.name || baseKey;
    }
    if (!THEME_PRESETS[baseKey]) baseKey = DEFAULT_THEME_NAME;
    const base = THEME_PRESETS[baseKey];
    const resolved = {
        name: (descriptor && descriptor.name) || (typeof themeValue === 'string' ? themeValue : baseKey),
        label: descriptor?.label || base.label || baseKey,
        css: mergeThemeSections(base.css, descriptor?.css),
        lane: mergeThemeSections(base.lane, descriptor?.lane),
        racers: mergeThemeSections(base.racers, descriptor?.racers),
        fxAll: descriptor?.fxAll ?? base.fxAll ?? 'off'
    };
    if (!resolved.name) resolved.name = baseKey;
    return resolved;
}

function applyTheme(themeValue, options = {}) {
    const { persist = true, allowAvatarReset = false } = options;
    const descriptor = themeValue ?? state.settings.themeConfig ?? state.settings.theme;
    const resolved = resolveTheme(descriptor);
    state.theme = resolved;

    if (persist) {
        if (typeof themeValue === 'object' && themeValue !== null) {
            state.settings.themeConfig = themeValue;
            state.settings.theme = resolved.name || state.settings.theme;
        } else if (typeof themeValue === 'string') {
            state.settings.theme = themeValue;
            state.settings.themeConfig = null;
        } else if (!state.settings.theme) {
            state.settings.theme = resolved.name || DEFAULT_THEME_NAME;
        }
    }

    const root = document.documentElement;
    if (resolved.name) root.dataset.theme = resolved.name;
    for (const [key, value] of Object.entries(resolved.css || {})) {
        if (value == null) continue;
        root.style.setProperty(key, value);
    }

    ensureThemeOption(state.settings.theme, resolved.label || state.settings.theme);
    if (inpTheme) inpTheme.value = state.settings.theme;

    if (allowAvatarReset && state.settings.pool.mode === 'emotes') {
        state.settings.pool.emotes = getThemeFallbackEmotes(resolved).slice();
    }

    return resolved;
}

function snapshotSettings() {
    const { title, durationSec, finishPctFromRight, chaos, rubber, fxAll, leadPhases, theme } = state.settings;
    return {
        title,
        durationSec,
        finishPctFromRight,
        chaos,
        rubber,
        fxAll,
        leadPhases,
        theme,
        themeLabel: state.theme?.label || theme
    };
}

function snapshotPlayers(players = state.players) {
    return players.map(p => ({
        id: p.id,
        name: p.name,
        motion: p.motion,
        avatarUrl: p.imgUrl,
        avatarEmoji: p.avatarEmoji || null
    }));
}

function createConfigSnapshot() {
    const cfg = {
        version: 2,
        title: state.settings.title,
        duration: state.settings.durationSec,
        durationSec: state.settings.durationSec,
        finishPct: state.settings.finishPctFromRight,
        finishPctFromRight: state.settings.finishPctFromRight,
        chaos: state.settings.chaos,
        rubberBand: state.settings.rubber,
        leadPhases: state.settings.leadPhases,
        theme: state.settings.theme,
        fxMode: state.settings.fxAll,
        players: state.players.map(p => {
            const entry = { name: p.name, motion: p.motion };
            if (p.avatarEmoji) entry.avatar = p.avatarEmoji;
            if (p.imgUrl && !p.imgUrl.startsWith('data:')) entry.avatarUrl = p.imgUrl;
            return entry;
        }),
        settings: {
            title: state.settings.title,
            durationSec: state.settings.durationSec,
            finishPctFromRight: state.settings.finishPctFromRight,
            chaos: state.settings.chaos,
            rubber: state.settings.rubber,
            fxAll: state.settings.fxAll,
            leadPhases: state.settings.leadPhases,
            theme: state.settings.theme,
            bannerTopH: state.settings.bannerTopH,
            bannerBotH: state.settings.bannerBotH,
            pool: { mode: state.settings.pool.mode, emotes: state.settings.pool.emotes.slice() }
        }
    };
    if (state.settings.themeConfig) cfg.themeConfig = state.settings.themeConfig;
    return cfg;
}

function normalizeIncomingConfig(raw) {
    if (!raw || typeof raw !== 'object') return { settings: {}, players: [] };
    if (raw.settings && typeof raw.settings === 'object') {
        return {
            version: raw.version,
            settings: {...raw.settings},
            players: Array.isArray(raw.players) ? raw.players.slice() : [],
            theme: raw.theme ?? raw.settings.theme ?? null,
            themeConfig: raw.themeConfig ?? raw.settings.themeConfig ?? null
        };
    }
    const settings = {};
    if ('title' in raw) settings.title = raw.title;
    if ('duration' in raw) settings.durationSec = raw.duration;
    if ('durationSec' in raw) settings.durationSec = raw.durationSec;
    if ('finishPct' in raw) settings.finishPctFromRight = raw.finishPct;
    if ('finishPctFromRight' in raw) settings.finishPctFromRight = raw.finishPctFromRight;
    if ('chaos' in raw) settings.chaos = raw.chaos;
    if ('chaosLevel' in raw) settings.chaos = raw.chaosLevel;
    if ('randomness' in raw) settings.chaos = raw.randomness;
    if ('rubberBand' in raw) settings.rubber = raw.rubberBand;
    if ('rubber' in raw) settings.rubber = raw.rubber;
    if ('catchUp' in raw) settings.rubber = raw.catchUp;
    if ('leadPhases' in raw) settings.leadPhases = raw.leadPhases;
    if ('leadPhaseCount' in raw) settings.leadPhases = raw.leadPhaseCount;
    if ('fxMode' in raw) settings.fxAll = raw.fxMode;
    if ('fxAll' in raw) settings.fxAll = raw.fxAll;
    if ('bannerTopH' in raw) settings.bannerTopH = raw.bannerTopH;
    if ('bannerBotH' in raw) settings.bannerBotH = raw.bannerBotH;
    if ('pool' in raw) settings.pool = raw.pool;
    if ('logoUrl' in raw) settings.logoUrl = raw.logoUrl;
    if ('bannerTopUrl' in raw) settings.bannerTopUrl = raw.bannerTopUrl;
    if ('bannerBotUrl' in raw) settings.bannerBotUrl = raw.bannerBotUrl;
    return {
        version: raw.version,
        settings,
        players: Array.isArray(raw.players) ? raw.players.slice() : [],
        theme: raw.theme ?? raw.themeName ?? raw.themeSlug ?? null,
        themeConfig: raw.themeConfig ?? null
    };
}

function mapIncomingPlayer(p, idx = 0) {
    const name = (p && typeof p.name === 'string' && p.name.trim()) ? p.name.trim() : `Player ${idx + 1}`;
    const motion = (p && typeof p.motion === 'string' && ['roll', 'floaty', 'wheelie'].includes(p.motion)) ? p.motion : 'roll';
    const emojiCandidates = [p?.avatarEmoji, p?.avatar, p?.emoji, p?.icon, p?.initial];
    const urlCandidates = [p?.avatarUrl, p?.imageUrl, p?.img, p?.imgUrl, p?.avatarSrc];
    let avatarEmoji = '';
    let imgUrl = '';

    for (const candidate of emojiCandidates) {
        if (typeof candidate === 'string' && candidate.trim()) {
            avatarEmoji = candidate.trim();
            imgUrl = emojiToDataURL(avatarEmoji);
            break;
        }
    }
    if (!imgUrl) {
        for (const candidate of urlCandidates) {
            if (typeof candidate === 'string' && candidate.trim()) {
                imgUrl = candidate.trim();
                break;
            }
        }
    }
    if (!imgUrl && typeof p?.avatar === 'string' && p.avatar.trim()) {
        const val = p.avatar.trim();
        if (/^(https?:|data:|blob:)/.test(val)) {
            imgUrl = val;
        } else {
            avatarEmoji = val;
            imgUrl = emojiToDataURL(val);
        }
    }
    if (!imgUrl && typeof p?.imgUrl === 'string' && p.imgUrl.trim()) {
        imgUrl = p.imgUrl.trim();
    }

    return { id: uid(), name, motion, imgUrl, avatarEmoji };
}

function applyNormalizedConfig(cfg, options = {}) {
    const { allowAvatarReset = false, fillMissingAvatars = true } = options;
    const s = cfg.settings || {};

    if ('title' in s && typeof s.title === 'string') state.settings.title = s.title.slice(0, 120);
    if ('durationSec' in s) state.settings.durationSec = clamp(num(s.durationSec, state.settings.durationSec), 5, 600);
    if ('finishPctFromRight' in s) state.settings.finishPctFromRight = clamp(num(s.finishPctFromRight, state.settings.finishPctFromRight), 2, 30);
    if ('chaos' in s) state.settings.chaos = clamp(parseFloat(s.chaos), 0, 1) || state.settings.chaos;
    if ('rubber' in s) state.settings.rubber = clamp(parseFloat(s.rubber), 0, 1) || state.settings.rubber;
    if ('fxAll' in s && typeof s.fxAll === 'string') state.settings.fxAll = s.fxAll;
    if ('leadPhases' in s) state.settings.leadPhases = clamp(num(s.leadPhases, state.settings.leadPhases), 1, 10);
    if ('bannerTopH' in s) state.settings.bannerTopH = clamp(num(s.bannerTopH, state.settings.bannerTopH), 0, 40);
    if ('bannerBotH' in s) state.settings.bannerBotH = clamp(num(s.bannerBotH, state.settings.bannerBotH), 0, 40);
    if ('logoUrl' in s && typeof s.logoUrl === 'string') state.settings.logoUrl = s.logoUrl;
    if ('bannerTopUrl' in s && typeof s.bannerTopUrl === 'string') state.settings.bannerTopUrl = s.bannerTopUrl;
    if ('bannerBotUrl' in s && typeof s.bannerBotUrl === 'string') state.settings.bannerBotUrl = s.bannerBotUrl;
    if (s.pool) {
        const pool = s.pool;
        state.settings.pool.mode = pool.mode ?? state.settings.pool.mode ?? 'emotes';
        if (Array.isArray(pool.emotes) && pool.emotes.length) {
            state.settings.pool.emotes = pool.emotes.slice();
        }
    }

    const themeDescriptor = cfg.themeConfig || cfg.theme || state.settings.theme;
    applyTheme(themeDescriptor, { persist: true, allowAvatarReset });
    if (state.settings.pool.mode === 'emotes' && !state.settings.pool.emotes.length) {
        state.settings.pool.emotes = getThemeFallbackEmotes().slice();
    }

    if (Array.isArray(cfg.players) && cfg.players.length) {
        state.players = cfg.players.map((p, idx) => mapIncomingPlayer(p, idx));
    }

    if (fillMissingAvatars) randomAssignFromPool(false);

    applyHeader();
    renderPlayerRows();
    layoutTrack();
    applyBanners();
    syncSettingsFormFromState();
    setViewportVars();
}

function loadConfig(cfg, options = {}) {
    const normalized = normalizeIncomingConfig(cfg);
    const { errors, warnings } = validateConfigShape(normalized);
    if (errors.length) {
        const err = new Error('Invalid race configuration');
        err.validationErrors = errors;
        err.validationWarnings = warnings;
        throw err;
    }
    applyNormalizedConfig(normalized, options);
    if (!options.skipEmit) {
        emitEvent('config:loaded', {
            settings: snapshotSettings(),
            players: snapshotPlayers(),
            warnings
        });
    }
    return { warnings, settings: snapshotSettings(), players: snapshotPlayers() };
}

window.loadRaceConfig = loadConfig;
window.getRaceConfigSnapshot = createConfigSnapshot;

function validateConfigShape(cfg) {
    const errors = [], warnings = [];
    if (!cfg || typeof cfg !== 'object') {
        errors.push('Configuration is not an object.');
        return { errors, warnings };
    }
    if (!cfg.settings || typeof cfg.settings !== 'object') errors.push('Missing "settings" object.');
    if (!Array.isArray(cfg.players)) errors.push('"players" must be an array.');
    if (Array.isArray(cfg.players)) {
        cfg.players.forEach((p, idx) => {
            if (!p || typeof p !== 'object') {
                errors.push(`Player #${idx + 1} is not an object.`);
                return;
            }
            if (typeof p.name !== 'string' || !p.name.trim()) {
                warnings.push(`Player #${idx + 1} missing valid name — will auto-name.`);
            }
        });
    }
    const s = cfg.settings || {};
    if ('durationSec' in s && !Number.isFinite(Number(s.durationSec))) warnings.push('settings.durationSec is not numeric (will default).');
    if ('finishPctFromRight' in s && !Number.isFinite(Number(s.finishPctFromRight))) warnings.push('settings.finishPctFromRight is not numeric (will default).');
    if ('chaos' in s && !Number.isFinite(Number(s.chaos))) warnings.push('settings.chaos is not numeric (will default).');
    if ('rubber' in s && !Number.isFinite(Number(s.rubber))) warnings.push('settings.rubber is not numeric (will default).');
    return { errors, warnings };
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

        try {
            const cfg = safeJSON(raw);
            const { warnings } = loadConfig(cfg, { allowAvatarReset: true });
            const t1 = performance.now();
            toast(`Config loaded (${state.players.length} players) in ${(t1 - t0).toFixed(1)} ms`);
            if (warnings.length) console.warn('[Import] Warnings:', warnings);
        } catch (parseErr) {
            if (parseErr?.validationErrors) {
                console.error('[Import] Validation errors:', parseErr.validationErrors);
                alert(`Import failed:\n${parseErr.validationErrors.join('\n')}`);
            } else {
                console.error('[Import] JSON parse error:', parseErr);
                alert('Could not parse JSON. See console for details.');
            }
            return;
        }

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
    const emotes = lines(inpEmotes.value);
    state.settings.pool.emotes = emotes.length ? emotes : getThemeFallbackEmotes().slice();
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
    const emoteLines = lines(inpEmotes.value);
    state.settings.pool.emotes = emoteLines.length ? emoteLines : getThemeFallbackEmotes().slice();
    if (inpTheme) {
        applyTheme(inpTheme.value, { persist: true, allowAvatarReset: false });
    }
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
    // Keep --banner-h unitless (multiplied by --vh in CSS)
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
                p.avatarEmoji = '';
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
        applyLaneThemeStyles(lane);

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
    const placeholders = state.theme?.racers?.placeholders || {};
    const defaults = { roll: '🟣', floaty: '🦆', wheelie: '🏎️' };
    const emoji = placeholders[motion] || placeholders.default || defaults[motion] || '🟣';
    return emojiToDataURL(emoji);
}

function applyLaneThemeStyles(lane) {
    if (!lane) return;
    const laneTheme = state.theme?.lane || {};
    const map = {
        '--lane-bg': laneTheme.background,
        '--lane-border': laneTheme.border,
        '--lane-stripe-primary': laneTheme.stripePrimary,
        '--lane-stripe-secondary': laneTheme.stripeSecondary,
        '--lane-stripe-width': laneTheme.stripeWidth,
        '--lane-stripe-gap': laneTheme.stripeGap,
        '--lane-stripe-row': laneTheme.stripeRow
    };
    for (const [prop, value] of Object.entries(map)) {
        if (value !== undefined && value !== null && value !== '') lane.style.setProperty(prop, value);
        else lane.style.removeProperty(prop);
    }
}

// ===== Race engine =====
function startRace() {
    if (modal && getComputedStyle(modal).display !== 'none') saveSettings();
    if (state.race.running) return;
    if (state.players.length < 2) { alert('Add at least 2 players.'); return; }

    applyHeader(); layoutTrack(); applyBanners(); setViewportVars();
    emitEvent('race:starting', { settings: snapshotSettings(), players: snapshotPlayers(), timestamp: performance.now() });

    const lanes = [...track.querySelectorAll('.lane')];
    const trackRect = track.getBoundingClientRect();
    const finishX_px = trackRect.width * (1 - clamp(state.settings.finishPctFromRight, 2, 30) / 100);

    // === World & camera setup ===
    const FPS = 60;
    const totalFrames = Math.max(1, state.settings.durationSec) * FPS;
    const pxPerUnit = finishX_px / 100;      // world→screen scale (100 world units ≈ finish line)
    const screenCenter = finishX_px * 0.55;  // where the “camera center” sits on screen
    const baseCamSpeedWU = (100 / totalFrames); // camera forward speed in world units/frame

    // racers in world space
    state.race.lastLeaderId = null;
    state.race.racers = state.players.map((p, i) => {
        const node = lanes[i].querySelector('.racer');
        node.style.left = '0px';
        const racer = {
            id: p.id,
            name: p.name || `Player ${i + 1}`,
            motion: (state.settings.fxAll === 'off' ? p.motion : state.settings.fxAll),
            node,
            laneNode: lanes[i],
            finished: false,
            finishOrder: 0,
            avatarEmoji: p.avatarEmoji || '',
            // world state
            worldX: 0,
            worldV: 0,
            vBase: rand(0.98, 1.02),
            vSkill: rand(0.98, 1.02),
            noiseT: Math.random() * 1000,
        };
        fxInit?.(racer);
        return racer;
    });

    // camera state
    const cam = { x: 0, v: baseCamSpeedWU, frame: 0 };

    // tuning
    const lerp = (a,b,t)=> a + (b-a)*t;
    const clamp01 = x => Math.max(0, Math.min(1, x));
    const chaos  = clamp01(state.settings.chaos);
    const rubber = clamp01(state.settings.rubber);

    const noiseAmp       = lerp(0.02, 0.18, chaos);
    const burstEPM       = lerp(  5,  40, chaos);
    const brakeEPM       = lerp(  3,  25, chaos);
    const pBurst         = burstEPM / (60*FPS);
    const pBrake         = brakeEPM / (60*FPS);
    const burstMagWU     = lerp(0.30, 2.50, chaos) * (100/totalFrames);
    const brakeMagWU     = lerp(0.20, 1.80, chaos) * (100/totalFrames);
    const catchUpMax     = lerp(0.20, 1.00, rubber);
    const catchUpPow     = lerp(1.40, 0.85, rubber);
    const leaderNerfMax  = lerp(0.00, 0.10, rubber);
    const endPackTighten = lerp(0.00, 0.60, rubber);

    // visuals
    ensureHUD();
    updateHUD({ timeLeftSec: state.settings.durationSec, leader: '—', chaos: state.settings.chaos, rubber: state.settings.rubber, gapPx: 0 });
    ensureLeaderBadge();
    const gate = buildStartGate();
    enableParallax(lanes); // make lane backgrounds scrollable

    state.race.running = true;
    state.race.startTs = performance.now();
    state.race.winner = null;
    podiumBox.style.display = 'none';
    bannerOverlay.style.display = 'none';
    lanesRemoveWinner();
    emitEvent('race:countdown', { durationMs: preRollMs, settings: snapshotSettings(), players: snapshotPlayers(), startTime: state.race.startTs });

    const preRollMs = 2600;
    let order = 0, launched = false;

    function tick(ts) {
        const elapsed = ts - state.race.startTs;

        // countdown freeze
        if (elapsed < preRollMs) {
            drawGate(gate, elapsed, preRollMs);
            updateParallax(lanes, cam.x, pxPerUnit); // even countdown can subtly move if you want; leave cam.x=0 so no move
            state.race.rafId = requestAnimationFrame(tick);
            return;
        } else if (!launched) {
            gate.remove(); launched = true;
            // hole-shot: tiny world burst so they jump relative to cam when it starts moving
            for (const r of state.race.racers) r.worldX += (baseCamSpeedWU * 18) * (0.8 + Math.random()*0.6);
            emitEvent('race:begin', { settings: snapshotSettings(), players: snapshotPlayers(), timestamp: ts });
        }

        cam.frame++;

        // camera: forward base + gentle follow of pack median so group stays around screenCenter
        const xs = state.race.racers.map(r => r.worldX);
        const leaderX = Math.max(...xs);
        const tailX   = Math.min(...xs);
        const medianX = xs.sort((a,b)=>a-b)[(xs.length-1)>>1];
        const spread  = Math.max(0.001, leaderX - tailX);

        // follow term nudges camera toward median so the pack hovers mid-screen
        const follow = (medianX - cam.x) * 0.015;
        cam.v = baseCamSpeedWU + follow;
        cam.x += cam.v;

        // racer dynamics in world space
        const finishedThisFrame = [];
        for (const r of state.race.racers) {
            if (r.finished) continue;

            const behind01 = (leaderX - r.worldX) / Math.max(0.001, spread);
            r.noiseT += 0.013 + Math.random() * 0.01;
            const smoothNoise = (Math.sin(r.noiseT*2.1) + Math.cos(r.noiseT*1.3)) * 0.5;

            let burstWU = 0, brakeWU = 0;
            if (Math.random() < pBurst) burstWU = (rand(0.5,1) * burstMagWU);
            if (Math.random() < pBrake) brakeWU = (rand(0.5,1) * brakeMagWU);

            const catchUp   = Math.pow(clamp01(behind01), catchUpPow) * catchUpMax;
            const isLeader  = (leaderX - r.worldX) < (0.1*spread);
            const leaderNerf = isLeader ? leaderNerfMax : 0;

            // base racer speed ~ cam speed, then add personality & effects
            let vWU = cam.v
                * r.vBase * r.vSkill
                * (1 + (smoothNoise * noiseAmp) + catchUp - leaderNerf);

            vWU += burstWU;
            vWU -= brakeWU;

            if (burstWU > 0) {
                const intensity = clamp01(burstMagWU ? burstWU / burstMagWU : burstWU);
                fxShow?.(r, 'boost', intensity);
            } else if (brakeWU > 0) {
                const intensity = clamp01(brakeMagWU ? brakeWU / brakeMagWU : brakeWU);
                fxShow?.(r, 'brake', intensity);
            }

            fxUpdateAssist?.(r, catchUp);
            fxUpdateLeaderNerf?.(r, leaderNerf);

            // endgame pack tighten to dramatize finish
            const distLeftWU = Math.max(0, 100 - r.worldX);
            const tightenK = (distLeftWU < 25) ? (endPackTighten * (1 - distLeftWU/25)) : 0;
            if (tightenK > 0 && state.race.racers.length >= 2) {
                const localAvg = (leaderX + tailX) * 0.5;
                vWU += (localAvg - r.worldX) * 0.002 * tightenK;
            }

            // integrate
            r.worldV = Math.max(vWU, baseCamSpeedWU * 0.2);
            r.worldX += r.worldV;

            // map to screen
            const screenX = (r.worldX - cam.x) * pxPerUnit + screenCenter;
            r.node.style.left = Math.round(screenX) + 'px';
            // optional micro-tilt from chaos
            r.node.style.rotate = (smoothNoise * noiseAmp * 16).toFixed(2) + 'deg';

            // finish when racer’s world crosses 100 WU
            if (!r.finished && r.worldX >= 100) finishedThisFrame.push(r);
        }

        // background parallax scroll
        updateParallax(lanes, cam.x, pxPerUnit);

        // resolve winner & podium
        if (finishedThisFrame.length && !state.race.winner) {
            // pick earliest crossing by back-solve
            let first = null, bestX = Infinity;
            for (const r of finishedThisFrame) if (r.worldX < bestX) { bestX = r.worldX; first = r; }
            if (first) state.race.winner = first;
        }
        if (finishedThisFrame.length) {
            finishedThisFrame.sort((a,b)=>a.worldX-b.worldX);
            for (const r of finishedThisFrame) if (!r.finished) {
                r.finished = true;
                r.finishOrder = ++order;
                fxUpdateAssist?.(r, 0);
                fxUpdateLeaderNerf?.(r, 0);
            }
        }

        // HUD + leader badge
        const leader = state.race.racers.slice().sort((a,b)=>b.worldX-a.worldX)[0];
        const timeLeftSec = Math.max(0, (totalFrames - cam.frame) / FPS);
        updateHUD({ timeLeftSec, leader: leader?.name || '—', chaos: state.settings.chaos, rubber: state.settings.rubber, gapPx: Math.round((leaderX - tailX) * pxPerUnit) });
        moveLeaderBadge(leader);
        if (leader?.id && leader.id !== state.race.lastLeaderId) {
            emitEvent('race:lead-change', {
                leader: { id: leader.id, name: leader.name },
                previousLeaderId: state.race.lastLeaderId,
                frame: cam.frame
            });
            state.race.lastLeaderId = leader.id;
        }

        // stop criteria: winner + top3 or time overtime
        const haveTop3 = state.race.racers.filter(r => r.finished).length >= Math.min(3, state.race.racers.length);
        const overtime = cam.frame > (totalFrames + 240);
        if (state.race.winner && (haveTop3 || overtime)) {
            state.race.running = false;
            cancelAnimationFrame(state.race.rafId);
            showWinnerAndPodium(state.race.winner, finishX_px);
            return;
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

        // Podium: order by finishOrder then remaining distance
        const finished = state.race.racers.slice().sort((a, b) => {
            const fa = a.finishOrder || Infinity;
            const fb = b.finishOrder || Infinity;
            if (fa !== fb) return fa - fb;
            return b.worldX - a.worldX;
        });
        const podiumNames = finished.slice(0, 3).map(r => r.name);
        podiumBox.innerHTML = `<div>🥇 ${podiumNames[0] || ''}</div><div>🥈 ${podiumNames[1] || ''}</div><div>🥉 ${podiumNames[2] || ''}</div>`;
        podiumBox.style.display = 'block';

        // Hide HUD at the end for cleaner winner moment
        const hud = document.getElementById('raceHUD');
        if (hud) hud.style.display = 'none';
        const crown = document.getElementById('leaderBadge');
        if (crown) crown.remove();

        emitEvent('race:finish', {
            winner: { id: winner.id, name: winner.name },
            podium: podiumNames,
            finishers: finished.map(r => ({
                id: r.id,
                name: r.name,
                finishOrder: r.finishOrder || Infinity,
                worldX: r.worldX,
                motion: r.motion
            })),
            durationMs: performance.now() - state.race.startTs
        });
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
    state.race.lastLeaderId = null;
    lanesRemoveWinner();
    bannerOverlay.style.display = 'none';
    podiumBox.style.display = 'none';

    // Assign avatars from pool NOW (per your request)
    randomAssignFromPool(true);

    renderPlayerRows();
    layoutTrack();
    emitEvent('race:reset', { settings: snapshotSettings(), players: snapshotPlayers(), timestamp: performance.now() });
}

function randomAssignFromPool(force = false) {
    const mode = state.settings.pool.mode;
    const fallbackEmotes = getThemeFallbackEmotes();
    for (const p of state.players) {
        if (!force && p.imgUrl) continue;
        if (mode === 'images' && state.settings.pool.images.length) {
            p.imgUrl = pick(state.settings.pool.images);
            p.avatarEmoji = '';
        } else {
            const pool = state.settings.pool.emotes.length ? state.settings.pool.emotes : fallbackEmotes;
            const emoji = pick(pool);
            p.imgUrl = emojiToDataURL(emoji);
            p.avatarEmoji = emoji;
        }
    }
}

function rand(a, b) {
    return a + Math.random() * (b - a);
}

function pick(arr) {
    return arr[(Math.random() * arr.length) | 0];
}

function getThemeFallbackEmotes(theme = state.theme) {
    const list = theme?.racers?.emotes;
    return Array.isArray(list) && list.length ? list : DEFAULT_EMOTES;
}

function emojiToDataURL(emoji, size = 128, fontSize = 96) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);
    ctx.font = `${fontSize}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, size / 2, size / 2);
    return canvas.toDataURL();
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

function populateThemeSelect() {
    if (!inpTheme) return;
    inpTheme.innerHTML = '';
    for (const [key, theme] of Object.entries(THEME_PRESETS)) {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = theme.label || key;
        inpTheme.appendChild(opt);
    }
}

function ensureThemeOption(value, label) {
    if (!inpTheme || !value) return;
    const options = Array.from(inpTheme.options);
    let opt = options.find(o => o.value === value);
    if (!opt) {
        opt = document.createElement('option');
        opt.value = value;
        opt.dataset.dynamic = 'true';
        inpTheme.appendChild(opt);
    }
    if (label) opt.textContent = label;
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
    const emotes = state.settings.pool.emotes && state.settings.pool.emotes.length ? state.settings.pool.emotes : getThemeFallbackEmotes();
    inpEmotes.value = emotes.join('\n');
    if (inpTheme) {
        ensureThemeOption(state.settings.theme, state.theme?.label || state.settings.theme);
        inpTheme.value = state.settings.theme;
    }

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

// Keep this helper in sync with the tuned numbers above
function getTuning(chaos, rubber){
    chaos  = clamp01(chaos);
    rubber = clamp01(rubber);

    // Randomness / events
    const noiseAmp = lerp(0.02, 0.18, chaos);
    const burstEPM = lerp(  5,  40, chaos);
    const brakeEPM = lerp(  3,  25, chaos);
    const pBurst   = burstEPM / (60*FPS);
    const pBrake   = brakeEPM / (60*FPS);
    const burstMag = lerp(0.30, 2.50, chaos);
    const brakeMag = lerp(0.20, 1.80, chaos);

    // Catch-up
    const catchUpMax     = lerp(0.20, 1.00, rubber);
    const catchUpPow     = lerp(1.40, 0.85, rubber);
    const leaderNerfMax  = lerp(0.00, 0.10, rubber);
    const endPackTighten = lerp(0.00, 0.60, rubber);

    return { noiseAmp, pBurst, pBrake, burstMag, brakeMag, catchUpMax, catchUpPow, leaderNerfMax, endPackTighten };
}
function ensureHUD(){
    let hud = document.getElementById('raceHUD');
    if (hud) { hud.style.display = 'grid'; return; }
    hud = document.createElement('div');
    hud.id = 'raceHUD';
    hud.style.position = 'absolute';
    hud.style.right = '10px';
    hud.style.bottom = '10px';
    hud.style.zIndex = '5';
    hud.style.display = 'grid';
    hud.style.gap = '4px';
    hud.style.padding = '8px 10px';
    hud.style.borderRadius = '10px';
    hud.style.background = 'rgba(0,0,0,.55)';
    hud.style.border = '1px solid #22304b';
    hud.style.fontWeight = '800';
    hud.innerHTML = `
      <div id="hudLine1">⏱️ Time: —</div>
      <div id="hudLine2">👑 Leader: —</div>
      <div id="hudLine3">🎲 Chaos: — | 🤝 Rubber: —</div>
      <div id="hudLine4">📏 Gap: —</div>
    `;
    track.appendChild(hud);
}
function updateHUD({timeLeftSec, leader, chaos, rubber, gapPx}){
    const l1 = document.getElementById('hudLine1');
    const l2 = document.getElementById('hudLine2');
    const l3 = document.getElementById('hudLine3');
    const l4 = document.getElementById('hudLine4');
    if (l1) l1.textContent = `⏱️ Time: ${Math.ceil(timeLeftSec)}s`;
    if (l2) l2.textContent = `👑 Leader: ${leader}`;
    if (l3) l3.textContent = `🎲 Chaos: ${Number(chaos).toFixed(2)} | 🤝 Rubber: ${Number(rubber).toFixed(2)}`;
    if (l4) l4.textContent = `📏 Gap: ${Math.round(gapPx)} px`;
}
function ensureLeaderBadge(){
    if (document.getElementById('leaderBadge')) return;
    const b = document.createElement('div');
    b.id = 'leaderBadge';
    b.textContent = '👑';
    b.style.position = 'absolute';
    b.style.zIndex = '6';
    b.style.fontSize = '24px';
    b.style.transform = 'translate(-6px, -28px)';
    track.appendChild(b);
}
function moveLeaderBadge(leader){
    const crown = document.getElementById('leaderBadge');
    if (!crown || !leader) return;
    const rect = leader.node.getBoundingClientRect();
    const tRect = track.getBoundingClientRect();
    crown.style.left = (rect.left - tRect.left) + 'px';
    crown.style.top  = (rect.top  - tRect.top)  + 'px';
}
function buildStartGate(){
    const g = document.createElement('div');
    g.style.position = 'absolute';
    g.style.inset = '0';
    g.style.display = 'grid';
    g.style.placeItems = 'center';
    g.style.zIndex = '4';
    const lights = document.createElement('div');
    lights.style.display = 'flex';
    lights.style.gap = '12px';
    ['🔴','🟠','🟢'].forEach((t,i)=>{
        const d = document.createElement('div');
        d.textContent = t;
        d.style.fontSize = '48px';
        d.style.opacity = '0.25';
        d.dataset.idx = String(i);
        lights.appendChild(d);
    });
    const txt = document.createElement('div');
    txt.style.marginTop = '8px';
    txt.style.fontWeight = '900';
    txt.style.fontSize = 'clamp(20px, 4vw, 48px)';
    txt.textContent = 'Get Ready…';
    g.append(lights, txt);
    track.appendChild(g);
    return g;
}
function drawGate(gate, elapsed, total){
    if (!gate) return;
    const dots = [...gate.querySelectorAll('[data-idx]')];
    const stage = Math.min(2, Math.floor((elapsed/total)*3)); // 0,1,2
    dots.forEach((d,i)=> d.style.opacity = i <= stage ? '1' : '0.25');
    const txt = gate.lastElementChild;
    txt.textContent = stage < 2 ? (stage === 0 ? '3…' : '2…') : 'GO!';
}

function fxInit(r){
    // container
    const fx = document.createElement('div');
    fx.style.position = 'absolute';
    fx.style.inset = '0';
    fx.style.pointerEvents = 'none';
    r.node.appendChild(fx);
    r._fx = { root: fx };

    // burst/brake badge
    const badge = document.createElement('div');
    Object.assign(badge.style, {
        position: 'absolute', left: '50%', top: '-34px', transform: 'translateX(-50%)',
        fontSize: '18px', fontWeight: '900', textShadow: '0 2px 6px rgba(0,0,0,.6)',
        opacity: '0', transition: 'opacity .12s ease, transform .12s ease'
    });
    fx.appendChild(badge);
    r._fx.badge = badge;

    // catch-up trail (left of racer)
    const trail = document.createElement('div');
    Object.assign(trail.style, {
        position: 'absolute', right: '100%', top: '40%',
        width: '0px', height: '6px', borderRadius: '3px',
        background: 'linear-gradient(90deg, rgba(0,255,180,.0) 0%, rgba(0,255,180,.8) 100%)',
        opacity: '0'
    });
    fx.appendChild(trail);
    r._fx.trail = trail;

    // leader drag halo
    const halo = document.createElement('div');
    Object.assign(halo.style, {
        position: 'absolute', left: '50%', top: '50%',
        width: '120%', height: '120%', borderRadius: '50%',
        transform: 'translate(-50%,-50%)',
        boxShadow: '0 0 0 0 rgba(255,80,80,0)',
        pointerEvents: 'none'
    });
    fx.appendChild(halo);
    r._fx.halo = halo;
}

function fxShow(r, type, intensity=1){
    const b = r._fx?.badge; if (!b) return;
    if (type === 'boost') { b.textContent = '⚡'; }
    else if (type === 'brake') { b.textContent = '🛑'; }
    b.style.opacity = '1';
    b.style.transform = 'translateX(-50%) translateY(-6px)';
    setTimeout(() => {
        b.style.opacity = '0';
        b.style.transform = 'translateX(-50%) translateY(0)';
    }, 260 + 180*intensity);
}

function fxUpdateAssist(r, catchUp){
    const t = r._fx?.trail; if (!t) return;
    if (catchUp <= 0.001){ t.style.opacity = '0'; return; }
    const px = Math.min(80, 16 + catchUp * 120);
    t.style.width = px + 'px';
    t.style.opacity = Math.min(0.95, 0.25 + catchUp * 0.9).toFixed(2);
}

function fxUpdateLeaderNerf(r, nerf){
    const h = r._fx?.halo; if (!h) return;
    if (nerf <= 0.001){ h.style.boxShadow = '0 0 0 0 rgba(255,80,80,0)'; return; }
    // soft red drag glow proportional to nerf
    const px = (6 + 28 * nerf).toFixed(0);
    const a  = Math.min(0.55, 0.15 + nerf * 0.7).toFixed(2);
    h.style.boxShadow = `0 0 ${px}px ${Math.round(px/4)}px rgba(255,80,80,${a})`;
}

function enableParallax(lanes){
    // ensure each lane uses a repeating grid background that can scroll
    lanes.forEach(l => {
        l.style.backgroundRepeat = 'repeat';
        // keep whatever your current background is; just make sure position is settable
        if (!l.style.backgroundPosition) l.style.backgroundPosition = '0px 0px';
    });
}

function updateParallax(lanes, camX_WU, pxPerUnit){
    const offsetPx = Math.round(-camX_WU * pxPerUnit);
    // move grid left as camera advances
    lanes.forEach(l => {
        const pos = l.style.backgroundPosition || '0px 0px';
        const y = pos.split(' ')[1] || '0px';
        l.style.backgroundPosition = `${offsetPx}px ${y}`;
    });
}

function createEventHub(){
    const listeners = new Map();

    function on(type, handler){
        if (!type || typeof handler !== 'function') return () => {};
        const set = listeners.get(type) || new Set();
        set.add(handler);
        listeners.set(type, set);
        return () => off(type, handler);
    }

    function once(type, handler){
        if (typeof handler !== 'function') return () => {};
        const wrapper = (detail) => {
            off(type, wrapper);
            handler(detail);
        };
        return on(type, wrapper);
    }

    function off(type, handler){
        if (!type) {
            listeners.clear();
            return;
        }
        const set = listeners.get(type);
        if (!set) return;
        if (handler) {
            set.delete(handler);
        } else {
            set.clear();
        }
    }

    function emit(type, detail){
        const set = listeners.get(type);
        if (!set || !set.size) return;
        for (const fn of [...set]) {
            try {
                fn(detail);
            } catch (err) {
                console.error('[Racer] Event listener error', err);
            }
        }
    }

    return { on, once, off, emit };
}

// ===== Init =====
function init() {
    populateThemeSelect();
    applyTheme(state.settings.theme, { persist: true, allowAvatarReset: true });
    applyHeader();
    applyTuningLabels();
    applyBanners();
    renderPlayerRows();
    layoutTrack();
    resetRace();           // your existing first-assign
    setViewportVars();     // <-- compute stage height once everything is in the DOM
    syncSettingsFormFromState();
    emitEvent('app:ready', { settings: snapshotSettings(), players: snapshotPlayers() });
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
