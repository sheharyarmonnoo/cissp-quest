# CISSP Quest ⚔️

A gamified CISSP study app - an RPG knowledge map covering all 8 CISSP domains. Sister app to [cpa-quest](https://github.com/sheharyarmonnoo/cpa-quest).

## Gameplay

- **16 zones** across the 8 CISSP domains (2 zones per domain), 7 questions each
- **Final Boss: The CAT Hydra** - 8 mixed boss questions, unlocked by clearing all zones
- **Daily Challenge** - 10 seeded-random questions from the full 120-question pool
- HP, XP, levels, gold, streak multipliers, item shop (50/50, hints, shields, double XP), and unlockable abilities
- Progress saved locally (IndexedDB with localStorage fallback), installable as a PWA

## Domains covered

| Zones | Domain |
|---|---|
| 1-2 | D1: Security & Risk Management |
| 3-4 | D2: Asset Security |
| 5-6 | D3: Security Architecture & Engineering |
| 7-8 | D4: Communication & Network Security |
| 9-10 | D5: Identity & Access Management |
| 11-12 | D6: Security Assessment & Testing |
| 13-14 | D7: Security Operations |
| 15-16 | D8: Software Development Security |

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
```

Built with React 19 + Vite. Question data lives in `src/data/zonesDomains1to4.js` and `src/data/zonesDomains5to8.js`.
