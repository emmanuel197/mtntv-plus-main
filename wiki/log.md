# Log

- 2026-11-19 — Step 1: scaffolded React + Vite 7, added Tailwind 4 (`@theme static` placeholder tokens), `@/` alias, `src/config/env.js`, `.env.example`; removed Vite demo files; started the wiki (pitfalls list carried over from WONA).
- 2026-11-19 — Folder layout changed to plain-English area folders (see project-structure.md); moved env.js to `app-settings/`, styles to `styles/global.css` + `styles/design-tokens.css`.
- 2026-11-19 — Figma file found and readable via REST (view-only); mapped pages/sections and the mobile home screen in `pages/figma-designs.md`. Token extraction not finished (requests timed out).
- 2026-11-19 — Tokens: brand `#FFC90D` and page `#000000` set in `src/styles/design-tokens.css` (pixel-sampled from the Figma render); Figma REST then stopped answering (see figma-designs.md). Font still unknown.
- 2026-11-19 — Interim brief: AfriPlay MTN Ghana operator (`afriplaymtnghana`/237/`amngh`, +233) in `.env.local`; added `VITE_COUNTRY_CALLING_CODE`. Fonts/tokens: DM Sans, muted = white 65%, surface `#1A1A1A` (our pick).
- 2026-11-19 — Step 2: React Router 7 + lucide-react; AppLayout with desktop navbar / phone top bar / floating bottom bar; 7 placeholder routes + 404. Added `shorts/` folder. Checked at 375px and desktop.
