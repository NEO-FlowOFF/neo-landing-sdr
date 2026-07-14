# CLAUDE.md — neo-landing-sdr

See `AGENTS.md` and `MARKDOWN_STYLE_GUIDE.md` for full operating rules and markdown formatting standards.

## Build & Dev Commands

- Dev Server: `make dev` (or `pnpm dev`)
- Build Project: `make build` (or `pnpm run build`)
- Preview Build: `make preview` (or `pnpm run preview`)

## Core Architecture

- Framework: Astro 5 (`^5.12.0`)
- Edge Adapter: `@astrojs/cloudflare`
- Commercial CTA Destination: `https://chat.neoflowoff.agency`
