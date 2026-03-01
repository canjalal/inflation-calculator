# Inflation Price Translator

A beautiful U.S. inflation calculator built with React + TypeScript + Vite. Compares the buying power of the dollar from 1913 to 2026 using CPI-U data from the Bureau of Labor Statistics.

![screenshot](https://img.shields.io/badge/CPI--U-1913–2026-c9a96e)

## Project Structure

```
src/
├── main.tsx                  # Entry point
├── InflationCalculator.tsx   # Root component
├── types.ts                  # Domain types
├── constants.ts              # Design tokens & config
├── cpiData.ts                # Raw CPI-U dataset
├── dataService.ts            # CPI parsing & indexing
├── calculations.ts           # Inflation math (pure functions)
├── formatters.ts             # Currency/date/percent display
├── chartGeometry.ts          # SVG sparkline computation
├── hooks.ts                  # Custom React hooks
├── styles.ts                 # Style factories
└── components/
    ├── DateSelector.tsx
    ├── SwapButton.tsx
    ├── StatPill.tsx
    ├── CPISparkline.tsx
    └── ResultCard.tsx
```

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deploy (free)

### Option A — Vercel (recommended, easiest)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com), sign in with GitHub
3. Click **"Add New Project"** → import this repo
4. Vercel auto-detects Vite. Click **Deploy**. Done.

Every push to `main` auto-deploys.

### Option B — Netlify

1. Push to GitHub
2. Go to [app.netlify.com](https://app.netlify.com)
3. **"Add new site"** → **"Import an existing project"** → select this repo
4. Build command: `npm run build` | Publish directory: `dist`
5. Click Deploy.

### Option C — Cloudflare Pages

1. Push to GitHub
2. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Pages** → **Create a project**
3. Connect to Git → select this repo
4. Build command: `npm run build` | Output directory: `dist`
5. Deploy.

### Option D — GitHub Pages

1. Install: `npm install -D gh-pages`
2. Add to `package.json` scripts: `"deploy": "gh-pages -d dist"`
3. Add `base: '/REPO_NAME/'` to `vite.config.ts`
4. Run: `npm run build && npm run deploy`

## License

MIT
