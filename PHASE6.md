# Phase 6 — Polish: Animations, Mobile, Accessibility

**Status:** Not started

## Overview

Phase 6 is the final polish pass. The app is fully functional — this phase focuses on
making it feel *great*: smooth animations, bulletproof mobile experience, proper
accessibility, and small UX refinements.

---

## What to Build

### 1. Animations & Transitions

**Add-to-cart feedback:**
- Cart badge in header bounces/scales briefly when item count changes
- "Added!" button state has a subtle scale or checkmark animation
- Token wallet balance animates (count up/down) when deducted or reset

**Page transitions:**
- Smooth fade or slide transitions between routes (consider `next/navigation` events or CSS)
- Menu item cards stagger-fade-in when the page loads or category changes

**Micro-interactions:**
- Quantity +/- buttons in cart have a subtle press effect
- Category tabs slide indicator to active tab
- Hover effects: cards lift slightly with shadow increase (some already exist)

### 2. Mobile Responsiveness

**Header:**
- Collapse nav links into a hamburger menu on small screens
- Token wallet + cart icon remain visible at all breakpoints
- Ensure tap targets are at least 44x44px

**Menu page:**
- Category tabs: horizontal scroll with fade edges on overflow (already scrollable)
- Cards: single column on mobile with slightly reduced padding
- Ensure card text doesn't truncate awkwardly on narrow screens

**Cart page:**
- Stack item rows vertically on mobile (currently horizontal flex)
- Quantity controls and remove button below item name on small screens
- "Place Order" button full-width and sticky at bottom on mobile

**Order confirmation:**
- Receipt width adapts to screen (already `max-w-2xl`, should be fine)
- Action buttons stack vertically on mobile (already using `flex-col sm:flex-row`)

### 3. Accessibility

**Semantic HTML:**
- Ensure all interactive elements are `<button>` or `<a>`, not `<div onClick>`
- Add `<nav>`, `<main>`, `<section>` landmarks where missing
- Cart item list should use `<ul>` / `<li>` structure

**ARIA labels:**
- Cart icon: `aria-label="Cart, X items"`
- Quantity buttons: `aria-label="Decrease quantity"` / `"Increase quantity"`
- Remove button: `aria-label="Remove {item name} from cart"`
- Category tabs: `role="tablist"` with `role="tab"` and `aria-selected`
- Wallet reset button: `aria-label="Reset wallet to 10,000 tokens"`

**Focus management:**
- Visible focus rings on all interactive elements (Tailwind `focus-visible:ring-2`)
- After placing order, focus moves to the confirmation heading
- Skip-to-content link at top of page

**Keyboard navigation:**
- Category tabs navigable with arrow keys
- All actions reachable via Tab + Enter/Space
- Escape key closes any future modals/drawers

**Screen reader:**
- Token prices: `aria-label="450 tokens"` (not just visual text)
- Stock status announced: "5 remaining" / "Out of stock"
- Cart badge count announced on change (live region)

### 4. Loading & Error States

**Menu page:**
- Loading skeleton cards while data fetches (SSR makes this fast, but good for slow connections)
- Error boundary with friendly message if DB query fails

**Cart page:**
- Skeleton state while placing order (already have spinner)

**General:**
- Add a `loading.tsx` file in `app/` for route-level suspense fallback
- `error.tsx` boundary in `app/` for uncaught errors
- `not-found.tsx` custom 404 page matching the café aesthetic

### 5. Stock Restoration (Deferred from Phase 4)

When a user adds items to cart, stock decrements immediately. If the user abandons
their cart (closes tab, navigates away), that stock is permanently lost.

**Options to consider:**
- **Timer-based restoration** — if cart isn't checked out within N minutes, restore stock via a cron/edge function
- **Restore on page unload** — `beforeunload` event calls a server action to restore stock (unreliable)
- **Accept the loss** — stock is cosmetic anyway; just re-seed periodically (simplest)

**Recommendation:** Accept the loss for now. Stock is cosmetic and the app reseeds at 50.
Add a "Restock" admin action or re-seed script if stock gets too low.

### 6. Home Page (`app/page.tsx`)

The home page is currently a placeholder. Polish it with:
- **Hero section** — large heading, tagline, CTA button to `/menu`
- **Featured items** — grid of 4 featured items from the database
- **Café vibe** — warm imagery, brand personality, maybe a fun Claude quote

---

## File Changes Summary

| File | Action | What |
|------|--------|------|
| `app/page.tsx` | **Modify** | Build out home page with hero + featured items |
| `app/loading.tsx` | **Create** | Route-level loading skeleton |
| `app/error.tsx` | **Create** | Error boundary with café styling |
| `app/not-found.tsx` | **Create** | Custom 404 page |
| `components/Header.tsx` | **Modify** | Mobile hamburger menu, ARIA labels |
| `components/MenuItemCard.tsx` | **Modify** | Animations, ARIA labels, focus rings |
| `components/MenuGrid.tsx` | **Modify** | Stagger animations, ARIA on tabs |
| `components/CategoryTabs.tsx` | **Modify** | Tab role, arrow key nav, ARIA |
| `components/CartIcon.tsx` | **Modify** | Badge animation, ARIA live region |
| `components/TokenWallet.tsx` | **Modify** | Balance animation, ARIA label |
| `app/cart/page.tsx` | **Modify** | Mobile layout, ARIA labels, list semantics |
| `app/order-confirmed/page.tsx` | **Modify** | Focus management on mount |
| `app/globals.css` | **Modify** | Add animation keyframes if needed |

---

## Acceptance Criteria

1. All pages look great on mobile (375px), tablet (768px), and desktop (1280px)
2. Lighthouse accessibility score ≥ 90
3. All interactive elements have visible focus indicators
4. Screen reader can navigate the full menu → cart → checkout flow
5. Add-to-cart and checkout have smooth, delightful animations
6. 404 and error pages match the café aesthetic
7. Home page is inviting with hero section and featured items
