# mysubspace

A MySpace-inspired social space for kink communities — feed, groups, profiles, marketplace, and consent-first interactions.

Built from the original HTML prototype as a **Vite + React + TypeScript** app.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Project structure

```
src/
  components/     UI screens and overlays
  hooks/          App state and interactions
  lib/            GIPHY integration
  index.css       Design tokens and styles from prototype
```

## Features (prototype)

- **Feed** — group activity, reactions, spanks, RSVPs
- **Groups** — list, detail, calendar, members
- **Profile** — MySpace-style layout, Top 8, comment wall, games
- **Market** — gear listings with filters
- **Onboarding** — invite flow with 18+ gate
- **Consent** — per-interaction permission requests
- **Reactor** — emoji keyboard + GIPHY picker for wall posts
