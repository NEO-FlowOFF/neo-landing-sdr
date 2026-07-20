# CLAUDE.md — neo-landing-sdr

See `AGENTS.md`, `SETUP.md`, and `MARKDOWN_STYLE_GUIDE.md` for full operating rules, technical setup, and markdown formatting standards.

## Build & Dev Commands (`Makefile`)

- Dev Server: `make dev`
- Type/Astro Check: `make check`
- Build Project: `make build` (automatically couples `dist/server` into `dist/client/_worker.js` for Cloudflare Pages Edge execution — see `SETUP.md`)
- Preview Build: `make preview`

## Core Architecture & Design Standards

- Framework: Astro 5 (`^5.12.0`) + Cloudflare Edge Adapter (`@astrojs/cloudflare` in hybrid static mode)
- Embedded Chat & Edge API: `ChatBubble.astro` widget powered by `/api/chat` route using OpenAI API (`OPENAI_API_KEY`) and SDR knowledge (`src/lib/`)
- Commercial CTA Destination: `https://wa.me/5562994789032` (`whatsapp contact`)
- Color Palette: `#000000` (50% dark background), `#DEDDD3` (40% high contrast clear sections/text), `#EDFF00` (8% traction buttons/highlights), `#FF7A05` (2% precision borders/lines), `#1B1E00` (olive capsules).
- Kicker Headers (`.kicker`): Render with `opacity: 0.4` and transition to `opacity: 1` on hover.
- Diagram Nomenclature (`InfrastructureMap.astro`): Core unit exact case is **`NEØ:one`**, labeled `AGENT SDR IA` with `ORCHESTRATION: ACTIVE`. Light status dots (`.node-entry-pin.status-dot`) are placed on the top center border of cards.
