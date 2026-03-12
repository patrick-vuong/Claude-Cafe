# Claude Café — Working Instructions for Claude Code

## Project Overview

Claude Café is a full-stack digital coffee shop web app themed around Claude Code
and the Anthropic AI ecosystem. Items are priced in **tokens** (cosmetic only — no real
money). The aesthetic is warm, cozy café with Claude brand colors and subtle terminal/AI
accents. This is a showcase/community project — not a real e-commerce application.

Full creative spec: see `PROJECT.md`. User-facing overview: see `README.md`.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript — strict mode enabled |
| Styling | Tailwind CSS — utility classes only |
| State | React Context + useReducer |
| Fonts | Playfair Display (display), Inter (body) via `next/font` |
| Icons | Lucide React |
| Database | Supabase (PostgreSQL) |
| ORM | Prisma |
| Package Manager | npm |

---

## Project Structure

```
claude-cafe/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (fonts, providers, header)
│   ├── page.tsx            # Home / landing
│   ├── menu/page.tsx       # Full menu
│   ├── cart/page.tsx       # Cart review
│   ├── order-confirmed/    # Post-order success
│   └── actions/            # Server Actions
│       ├── menu.ts         # Menu queries + stock mutations
│       └── orders.ts       # Order creation
├── components/             # All reusable UI components
├── context/                # React Context providers
│   └── CartContext.tsx     # Cart + wallet state
├── lib/
│   └── db.ts               # Prisma client singleton
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed data (menu items + stock)
├── types/                  # Shared TypeScript types
│   └── index.ts
└── public/                 # Static assets (images, icons)
```

---

## Coding Conventions

### TypeScript
- Strict mode is on — no `any`, no non-null assertions without justification
- Define all shared types in `types/index.ts`
- Use `interface` for object shapes, `type` for unions and aliases

### Naming
- Variables and functions: `camelCase`
- Components and types: `PascalCase`
- Files: `PascalCase` for components (`MenuItemCard.tsx`), `camelCase` for utilities
- Constants: `SCREAMING_SNAKE_CASE` for true constants (e.g. `STARTING_WALLET_BALANCE`)

### Styling
- **Tailwind only** — no inline styles, no CSS modules, no styled-components
- Use the design system colors from `tailwind.config.ts` (see Design System below)
- Responsive classes mobile-first: `sm:`, `md:`, `lg:`
- Token prices always use `font-mono`

### Components
- One component per file
- Props interfaces defined at the top of the file
- Keep components focused — extract sub-components when a file exceeds ~150 lines
- Use `'use client'` directive only when client interactivity is required

---

## Design System

### Colors (Tailwind custom config)

```
cream:     #F5ECD7   ← primary background
offwhite:  #FAF6F0   ← card backgrounds
espresso:  #2C1810   ← primary text
coral:     #E06C4B   ← primary accent / CTA buttons
amber:     #D4956A   ← secondary accent / hover
warmgray:  #8B7355   ← muted text / labels
```

### Typography
- `font-display` → Playfair Display (headings, item names)
- `font-sans` → Inter (body copy, UI labels)
- `font-mono` → system monospace (token prices, order IDs)

---

## Key Design Decisions — Respect These

1. **Tokens are cosmetic only.** They are a display/marketing layer. They must never be
   connected to real pricing, payment APIs, or real-money transactions of any kind.

2. **Warm and cozy aesthetic.** The palette is cream, espresso, coral, and amber.
   Do not introduce blues, grays, or any colors outside the design system without
   explicit approval.

3. **No dark mode** unless the user explicitly requests it as a feature.

4. **Terminal accents are intentional.** Monospace token prices and terminal-style
   order IDs (e.g. `#ORD-4a2f`) are part of the brand — preserve them.

5. **Menu items and inventory live in Supabase PostgreSQL, accessed via Prisma Server Actions.**
   Cart and wallet remain client-side in React Context + localStorage.

---

## DO NOT

- Add real payment processing (Stripe, PayPal, etc.)
- Change the token economy to display real dollar amounts
- Use CSS modules (Tailwind only)
- Use inline `style={{}}` props for visual styling
- Add `any` types without a comment explaining why
- Introduce dark mode without being asked
- Add authentication or user accounts
- Expose the Supabase service key to the client — use only the public anon key client-side
- Access the database directly from client components — use Server Actions only

---

## Testing

Playwright MCP is configured and available for browser-based testing.

**When to use Playwright MCP:**
- Verifying UI changes look correct after edits
- Testing user flows (e.g. add item → cart → checkout)
- Debugging layout or interaction issues
- Taking screenshots to confirm visual output

**Dev server URL:** `http://localhost:3000`

Always ensure `npm run dev` is running before launching Playwright tests.
Use `--headed` mode (already configured in `.mcp.json`) so tests are visible.

---

## How to Run

```bash
npm install       # Install dependencies
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build
npm run lint      # ESLint check
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials.
Never commit `.env.local`.

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Supabase pooled connection (pgBouncer) — used by Prisma at runtime |
| `DIRECT_URL` | Supabase direct connection — used by Prisma for migrations |
| `NEXT_PUBLIC_SUPABASE_URL` | Public Supabase project URL (safe to expose) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key (safe to expose) |

---

