<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

This is a single-service Next.js 16 (App Router, Turbopack) marketing/booking site for "OKC Exclusive Cleaning". Commands are in `package.json`: `npm run dev` (dev server on port 3000), `npm run build`, `npm run lint`. There are no automated tests.

- Dependencies are installed by the update script (`npm install`); the dev server is not auto-started — run `npm run dev` yourself.
- Email/quote forms: the three on-page forms (`InstantQuoteForm`, `QuoteForm`, `ContactForm`) submit **directly to the external Web3Forms API client-side** via `src/lib/web3forms.ts`, which requires the build-time env var `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. Without it, forms render and validate but submission fails with "Email service not configured." A valid key is required to reach the success screen. `NEXT_PUBLIC_*` vars are inlined at build/dev start, so set it before launching `npm run dev` (e.g. in `.env.local`) and restart after changing it.
- The `src/app/api/*` route handlers (`/api/contact`, `/api/quote`, `/api/instant-quote`) are server-side and degrade gracefully without `WEB3FORMS_ACCESS_KEY` (returning dev-mode success), but the current frontend forms do NOT call them.
