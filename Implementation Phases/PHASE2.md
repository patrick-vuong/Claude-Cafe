# Phase 2 — Next.js Scaffold + Supabase + Prisma

**Status:** Complete

## Overview

Phase 2 built the full-stack foundation: a Next.js 14 App Router project with TypeScript,
Tailwind CSS, Supabase PostgreSQL database, and Prisma 7 ORM. By the end of this phase,
the database was seeded with all 20 menu items and the server actions were functional.

---

## What Was Built

### 1. Next.js 14 Project Scaffold

- App Router structure with `app/` directory
- TypeScript strict mode enabled
- Tailwind CSS configured with custom design system colors
- Google Fonts: Playfair Display (display) + Inter (body) via `next/font`
- Root layout with font variables and `<Header />` component

### 2. Tailwind Configuration (`tailwind.config.ts`)

Custom theme extending Tailwind defaults:
- 6 brand colors: cream, offwhite, espresso, coral, amber, warmgray
- 2 font families: `font-display` (Playfair), `font-sans` (Inter)
- Content paths for `app/`, `components/`, `pages/`

### 3. Supabase + Prisma Integration

- **Prisma 7** with `@prisma/adapter-pg` (breaking change from v6 — no `datasourceUrl` option)
- `prisma.config.ts` handles datasource URL and seed command configuration
- `lib/db.ts` — PrismaClient singleton using `pg` Pool adapter with `global.prisma` pattern
- Connection via Supabase pooler (corporate firewall blocks direct port 5432)

### 4. Database Schema (`prisma/schema.prisma`)

Three models:
- **MenuItem** — id, name, description, category, tokenPrice, stock, image, tags, featured, available, createdAt
- **Order** — id, orderRef, totalTokens, createdAt
- **OrderItem** — id, orderId, menuItemId, quantity (join table)

### 5. Seed Data (`prisma/seed.ts`)

- 20 menu items across 5 categories
- Each item starts with 50 stock
- 4 items marked as featured
- Categories: espresso, tea, pastries, boosters, specials

### 6. Server Actions

| Action | File | Purpose |
|--------|------|---------|
| `getMenuItems()` | `app/actions/menu.ts` | Fetch all available items ordered by category + name |
| `checkStock(itemId)` | `app/actions/menu.ts` | Verify item is in stock |
| `decrementStock(itemId)` | `app/actions/menu.ts` | Atomically decrement stock by 1 |
| `placeOrder(items, total)` | `app/actions/orders.ts` | Create Order + OrderItems in a transaction |

### 7. Shared Types (`types/index.ts`)

- `MenuCategory` union type
- `MenuItem`, `CartItem`, `Cart`, `TokenWallet` interfaces
- `CATEGORY_MAP` — display config (emoji + label) for each category
- `STARTING_WALLET_BALANCE` constant (10,000)

### 8. Starter Pages

- `app/page.tsx` — Home page placeholder
- `app/layout.tsx` — Root layout with fonts, metadata, Header

### 9. Header Component (`components/Header.tsx`)

- Sticky header with Claude Café logo (Coffee icon + Playfair text)
- Tagline: "Where every prompt deserves a pour"
- Navigation links: Home, Menu
- Placeholder comment for cart icon + wallet (added in Phase 4)

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Supabase pooled connection (pgBouncer) |
| `DIRECT_URL` | Supabase direct connection (for migrations) |
| `NEXT_PUBLIC_SUPABASE_URL` | Public project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key |

---

## Key Decisions Made

1. **Prisma 7** required `@prisma/adapter-pg` with a `pg` Pool — no `datasourceUrl` option
2. **Supabase pooler** used instead of direct connection due to corporate firewall
3. **Server Actions** for all DB access — client components never touch the database
4. **Global singleton** pattern for PrismaClient to avoid connection exhaustion in dev

---

## Files Created / Modified

| File | Action |
|------|--------|
| `app/layout.tsx` | Created — root layout |
| `app/page.tsx` | Created — home placeholder |
| `app/globals.css` | Created — Tailwind directives |
| `app/actions/menu.ts` | Created — menu server actions |
| `app/actions/orders.ts` | Created — order server action |
| `components/Header.tsx` | Created — site header |
| `context/` | Directory created (empty until Phase 4) |
| `lib/db.ts` | Created — Prisma client singleton |
| `prisma/schema.prisma` | Created — database schema |
| `prisma/seed.ts` | Created — seed data |
| `prisma.config.ts` | Created — Prisma 7 config |
| `tailwind.config.ts` | Created — custom theme |
| `types/index.ts` | Created — shared types |
| `.env.local` | Created — environment variables (not committed) |
| `.env.example` | Created — template for env vars |
