# Racer Overlay Architecture

## Recommended Project Structure
```
.
├── racer.html                # Overlay entry point
├── js/
│   ├── racer.js              # Core app orchestrator, UI, race engine, FX hooks
│   ├── racer-assets/         # (optional) sprite sheets or SVGs per theme
├── config/
│   └── sample-race.json      # Example configuration payload
├── themes/
│   ├── cars.json             # Theme overrides (CSS variables, placeholders)
│   └── ducks.json
└── docs/
    └── racer-architecture.md # This guide
```

*Keep racer.html focused on layout and CSS variables. All runtime behaviour lives in `js/racer.js`.*

## Configuration Schema

`loadRaceConfig(config)` accepts either the legacy `{ settings, players }` format or a streamlined schema:

```jsonc
{
  "title": "Giveaway Grand Prix",
  "duration": 35,              // seconds
  "finishPct": 12,             // finish line position (percent from right)
  "chaos": 0.6,                // random boost/brake frequency
  "rubberBand": 0.7,           // catch-up assist strength
  "leadPhases": 3,             // forced lead swaps
  "theme": "cars",            // preset key or custom object
  "fxMode": "wheelie",        // optional global motion override
  "players": [
    { "name": "Alice", "motion": "wheelie", "avatar": "🚗" }
  ]
}
```

### Theme Overrides
A theme can be referenced by key (matching a built-in preset) or provided inline:
```jsonc
{
  "name": "purple-marble",
  "extends": "marbles",
  "css": { "--accent": "#a855f7" },
  "racers": { "placeholders": { "roll": "🪩" } }
}
```
Themes drive CSS variables, lane striping, and default avatar pools without editing core code.

## Key APIs

- `window.loadRaceConfig(config, options?)` – Replace race settings/players on the fly. Emits `config:loaded`.
- `window.getRaceConfigSnapshot()` – Current config snapshot (versioned).
- `window.RacerEvents` – Minimal event hub with `{ on, once, off }` for overlay integrations.
  - `race:starting`, `race:countdown`, `race:begin`, `race:lead-change`, `race:finish`, `race:reset`, `config:loaded`, `app:ready`.

## Race Loop Highlights

- Physics lives in `startRace()`. Camera/world units and FX updates run every frame via `requestAnimationFrame`.
- Boost/brake, assist trail, and leader halo are wired through `fxShow`, `fxUpdateAssist`, and `fxUpdateLeaderNerf`.
- Podium order respects `finishOrder` / `worldX` so second/third match real positions.

## Next Steps

- Persist `state.settings` to localStorage for quick reloads.
- Add WebSocket bridge that forwards `RacerEvents` payloads to remote overlays.
- Extend `themes/` with streamer-branded presets (colors, banners, audio cues).
