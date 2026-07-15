# CLAUDE.md — neo-landing-sdr

See `AGENTS.md` and `MARKDOWN_STYLE_GUIDE.md` for full operating rules and markdown formatting standards.

## Build & Dev Commands

- Dev Server: `make dev` (or `pnpm dev`)
- Build Project: `make build` (automatically couples `dist/server` into `dist/client/_worker.js` for Cloudflare Pages Edge execution)
- Preview Build: `make preview` (or `pnpm run preview`)

## Core Architecture

- Framework: Astro 5 (`^5.12.0`)
- Edge Adapter: `@astrojs/cloudflare` (`^14.1.3` in hybrid static mode)
- Embedded Chat & Edge API: `ChatBubble.astro` widget powered by `/api/chat` route using OpenAI API (`OPENAI_API_KEY`) and SDR knowledge (`src/lib/`)
- Commercial CTA Destination: `https://chat.neoflowoff.agency` (`neoflowoff-chat-ui`)
