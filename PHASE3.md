# Phase 3 — Menu Page + Data Fetching

**Status:** Complete

## Overview

Phase 3 built the menu page UI and connected it to the Supabase database via server actions.
Users can browse all 20 menu items, filter by category, and see stock levels — all fetched
from the live database.

---

## What Was Built

### 1. Menu Page (`app/menu/page.tsx`)

- **Server component** — fetches data at render time, no client-side waterfall
- Calls `getMenuItems()` server action to pull all items from Supabase
- Passes items to `<MenuGrid />` client component
- Heading: "Our Menu" with descriptive subtext

### 2. MenuGrid Component (`components/MenuGrid.tsx`)

- Client component (`'use client'`) for interactive filtering
- Derives unique categories from items using `useMemo`
- Filters items by active category (or shows all when no filter)
- Displays item count: "20 items" / "5 items"
- Empty state: "Nothing brewing here... yet!" with friendly copy
- Responsive grid: 1 column (mobile), 2 columns (sm), 3 columns (lg)

### 3. CategoryTabs Component (`components/CategoryTabs.tsx`)

- Horizontal scrollable tab bar
- "All" tab + one tab per category
- Uses `CATEGORY_MAP` from types for emoji + label display
- Active tab: coral background with white text
- Inactive tab: offwhite background with espresso text, amber hover

### 4. MenuItemCard Component (`components/MenuItemCard.tsx`)

Each card displays:
- **Featured badge** — amber "Featured" pill (top-right corner)
- **Name** — Playfair Display font
- **Description** — warmgray muted text
- **Tags** — small pills in cream background
- **Token price** — monospace, coral, bold (e.g. "450 tokens")
- **Stock indicator** — three states:
  - `stock > 10`: "X remaining" in muted text
  - `stock 1–10`: "Only X left!" in coral warning pill
  - `stock = 0`: "Out of Stock" in gray pill
- **Add to Cart button** — coral CTA, disabled + gray when out of stock

---

## Architecture

```
MenuPage (Server Component)
  └── getMenuItems() → Supabase
  └── <MenuGrid items={items}> (Client Component)
        ├── <CategoryTabs /> (Client Component)
        └── <MenuItemCard /> × N (Client Component)
```

The menu page is a **server component** that fetches data, then passes it down to client
components for interactivity. This is a Next.js App Router best practice — the DB query
runs server-side with zero client JavaScript for the fetch.

---

## Key Decisions Made

1. **Server component for data fetching** — no `useEffect` + loading spinners
2. **Category filtering is client-side** — all items are fetched once, filtered in memory
3. **`onAddToCart` was a placeholder** — `console.log` stub, wired up in Phase 4
4. **Stock UI has three tiers** — normal, low (≤10), and out-of-stock for clear visual hierarchy

---

## Files Created

| File | Action |
|------|--------|
| `app/menu/page.tsx` | Created — menu page (server component) |
| `components/MenuGrid.tsx` | Created — filterable item grid |
| `components/CategoryTabs.tsx` | Created — category filter tabs |
| `components/MenuItemCard.tsx` | Created — individual item card |
