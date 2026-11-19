# Project structure

✅ VERIFIED in code 2026-11-19.

## Stack
- React 19 + Vite 7 (`npm create vite@7`, `react` template), ESLint from the template.
- Tailwind CSS 4 via `@tailwindcss/vite`; tokens in `src/styles/design-tokens.css` under `@theme static` (values from Figma; see `figma-designs.md`).
- DM Sans via `@fontsource-variable/dm-sans` (self-hosted variable font).
- React Router 7 (`react-router` package; import from `'react-router'`, not `react-router-dom`).
- Icons: `lucide-react` (stand-ins until icon exports come from the designers).
- Planned, added in the step that needs them: Redux Toolkit, axios, universal-cookie, uuid, hls.js.

## Routes (Step 2, 2026-11-19)
All routes render inside `navigation/AppLayout.jsx` (desktop navbar ≥768px; phone top bar + floating bottom bar <768px).
Route list: `navigation/AppRouter.jsx`. Tab list shared by both bars: `navigation/nav-tabs.js`.
| Path | Page file |
|---|---|
| `/` | `home/HomePage.jsx` |
| `/live-tv` | `live-tv/LiveTvPage.jsx` |
| `/shorts` | `shorts/ShortsPage.jsx` |
| `/search` | `search/SearchPage.jsx` |
| `/more` | `my-account/MorePage.jsx` |
| `/bundles` | `my-account/BundlesPage.jsx` (Get Bundle pill) |
| `/notifications` | `my-account/NotificationsPage.jsx` (bell) |
| `*` | `navigation/NotFoundPage.jsx` |
All pages are placeholders (`shared-ui/PagePlaceholder.jsx`). Logo is a stand-in (`shared-ui/MtnTvLogo.jsx`) until the real file arrives.
Desktop navbar layout is a guess — the web Figma frames weren't readable (REST limit). ⚠️ ASSUMPTION
Hosting note: a single-page app needs the server to send `index.html` for every path (Vite dev does this already).

## Layout (decided 2026-11-19 — plain-English folder names, one area per folder)
Rule: each folder is named after one thing the app does, and everything for that thing lives in it
(pages, parts, server calls, state, helpers). Code used by only one area stays in that area.
Only code used by two or more areas goes in `shared-ui/` or `helpers/`. Folders are created when first used.
```
src/
  main.jsx                 starts the app (mounts <App/>, loads global styles)
  App.jsx                  top-level component
  app-settings/            env.js — the only file that reads .env values
  styles/                  global.css (whole-app styles) + design-tokens.css (colours, fonts)
  server-connection/       talking to Uniqcast + CRM: request setup, tokens, refresh on 401
  app-state/               Redux store setup (each area keeps its own slice in its folder)
  navigation/              routes, desktop navbar, phone bottom bar, signed-in guard
  sign-in-and-sign-up/     network check, OTP, sign-up, login screens + calls
  home/                    home screen: banners, content rows
  movies-and-series/       movie and series detail pages, episodes
  video-player/            HLS player, trailers, keep-watching bookmarks
  live-tv/                 channels, live playback, TV guide
  search/                  search screen + calls
  my-account/              profile, subscriptions, support, sign-out
  shorts/                  Shorts tab: vertical clips
  shared-ui/               UI pieces used by several areas (buttons, cards, rows)
  helpers/                 small functions used by several areas (image URLs, time formatting)
  images-and-icons/        logos, icons, static images
```
File names say what they are: `HomePage.jsx` (a screen), `home-requests.js` (server calls),
`home-state.js` (Redux slice), `BannerCarousel.jsx` (a part of the screen).
Path alias: `@/` → `src/` (in `vite.config.js`).

## Env variables
Template in `.env.example` (committed); real values in `.env.local` (gitignored). Restart Vite after changes.
`VITE_CLIENT_API_URL`, `VITE_CM_URL`, `VITE_OPERATOR_UID`, `VITE_OPERATOR_ID`, `VITE_USERNAME_PREFIX`, `VITE_COUNTRY_CALLING_CODE`,
`VITE_CM_USERNAME`, `VITE_CM_PASSWORD`, `VITE_IMAGE_ACCESS_KEY`, `VITE_BYPASS_AUTH`.
Server URLs default to the shared AfriPlay/WONA servers — `🔶 LIKELY` for MTN TV+ until the brief confirms.

## Scripts
`npm run dev` (Vite dev server, port 5173) · `npm run build` (to `dist/`) · `npm run preview` · `npm run lint`.

## Repo
GitHub `emmanuel197/mtntv-plus-main`, branch `main`.
