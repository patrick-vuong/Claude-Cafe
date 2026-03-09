# Lessons Learned

A running log of issues, architectural insights, and design decisions encountered during development.

---

## 1. Dev Server + Build Conflict (Phase 4)

**Problem:** Running `next build` while the dev server (`next dev`) was still active caused the UI to lose all styling. The page rendered as unstyled plain text on a white background.

**Root Cause:** Both `next dev` and `next build` write to the `.next` directory. The build overwrote the dev server's cached CSS assets, and the still-running dev process served stale/missing stylesheets.

**Fix:** Kill the dev server process, delete the `.next` directory, and restart `next dev` fresh.

**Prevention:**
- Always stop the dev server before running `next build`
- If styling suddenly disappears, check for multiple Next.js processes on the same port (`netstat -ano | grep :3000`)
- Clear `.next` cache (`rm -rf .next`) when in doubt

---

## 2. Missing Route Pages (Phase 4)

**Problem:** Clicking the cart icon in the header led to a 404 because `/cart` had no `page.tsx` yet.

**Root Cause:** The `CartIcon` component linked to `/cart`, but the page was planned for Phase 5 and hadn't been created.

**Prevention:**
- When adding navigation links or buttons that point to a route, ensure the route's page file exists — even if it's just a placeholder
- If a page is not yet implemented, either don't link to it or create a stub page with a "Coming soon" message

---

## 3. Supabase Pooler / Firewall (Phase 2)

**Problem:** Direct database connections to `db.xxx.supabase.co:5432` failed.

**Root Cause:** Corporate firewall blocks port 5432 on the direct Supabase host.

**Fix:** Use the Supabase connection pooler at `aws-1-us-east-1.pooler.supabase.com` (port 5432 for session mode, 6543 for transaction mode).

**Prevention:**
- Always use the pooler URL in `DATABASE_URL` for this project
- Test DB connectivity early when setting up a new environment

---

# Architectural Insights

## 4. Single Context for Cart + Wallet (Phase 4)

Cart and wallet live in one React Context because they're tightly coupled — the wallet balance determines whether you *can* add items, and checkout needs to deduct from the wallet and clear the cart atomically. Splitting them into separate contexts would mean coordinating two dispatches for a single user action, adding complexity without benefit at this scale.

## 5. localStorage for Wallet, Not Cart (Phase 4)

Stock is decremented server-side when items are added to cart. If we persisted the cart to localStorage and restored it on refresh, those items' stock was already consumed — but the user might never check out. Keeping the cart ephemeral avoids ghost inventory. Wallet is purely client-side math with no server coupling, so persisting it is safe and improves UX.

## 6. Hydration Guard Pattern (Phase 4)

The `CartProvider` uses a `hydrated` flag to avoid writing the default 10,000 balance to localStorage before reading the stored value. Without this, the first render would persist the default and overwrite any saved balance. The `useEffect` reads localStorage first, syncs state, *then* sets `hydrated = true` so the persistence effect can safely run.

## 7. Checkout Error Isolation (Phase 5)

The "Place Order" button runs three sequential steps: (1) `placeOrder()` server action writes to Supabase in a transaction, (2) `deductTokens()` updates client wallet, (3) `clearCart()` + navigate. If step 1 fails, steps 2 and 3 never run — the user's wallet and cart stay intact. Order ref and total are passed via URL search params to avoid needing server-side session state.

## 8. Menu Add-to-Cart State Pattern (Phase 4)

The `addingState` is managed in the parent `MenuGrid` rather than each `MenuItemCard`. This means only one card can be in the "adding" state at a time, which naturally prevents rapid double-clicks on multiple items — a subtle UX guard without extra debounce logic.

## 9. Conditional UI Elements (Phase 4)

The wallet reset button only renders when the balance is below 10,000. Showing a reset button at full balance adds clutter for no purpose. Same principle applies elsewhere: cart badge hides at 0 items, low-stock warnings only show at ≤10 stock.

---

# Phase 6 Insights

## 10. Next.js Special File Conventions (Phase 6)

Next.js App Router has reserved file names that activate built-in behavior:
- `loading.tsx` — shown automatically during route transitions (wraps the page in a Suspense boundary)
- `error.tsx` — catches runtime errors (must be `'use client'` since it needs `reset()`)
- `not-found.tsx` — handles 404s globally

Placing them in `app/` makes them global fallbacks. They can also be placed in specific route folders for route-level overrides.

## 11. Stagger Animation via Inline Style (Phase 6)

Instead of pre-defining CSS classes like `.stagger-1`, `.stagger-2` for each position, we use `style={{ animationDelay: \`${index * 0.05}s\` }}` calculated from the item's array index. This scales to any number of items without bloating the stylesheet, and each card fades in 50ms after the previous one.

## 12. Skip-to-Content Link Pattern (Phase 6)

The `sr-only focus:not-sr-only` Tailwind pattern makes the skip link invisible until a keyboard user presses Tab — then it appears at the top of the page. This is the #1 accessibility requirement for keyboard navigation and is often the first thing screen reader users look for. The link targets `#main-content` which wraps `{children}` in the root layout.

## 13. WAI-ARIA Tabs Pattern (Phase 6)

The CategoryTabs component now follows the WAI-ARIA tabs spec:
- `role="tablist"` on the container with `aria-label`
- `role="tab"` on each button with `aria-selected`
- `tabIndex={0}` on the active tab, `tabIndex={-1}` on inactive tabs
- Arrow Left/Right keys move between tabs (wrapping around)

This is the interaction pattern screen reader users expect. Without it, tab-style components feel like a random collection of buttons to assistive technology.

## 14. Focus Management on Navigation (Phase 6)

After placing an order, the confirmation page's heading receives focus via `useEffect` + `ref.current.focus()`. The heading has `tabIndex={-1}` so it's programmatically focusable but not in the natural tab order. Without this, screen reader users land on the confirmation page with no context — focus stays wherever the browser defaults, and they have to hunt for the "Order Placed!" heading.

## 15. Cart Badge Bounce via Ref (Phase 6)

The cart badge bounce animation uses a ref-based approach: track the previous `itemCount`, compare on change, remove the animation class, force a reflow (`void offsetWidth`), then re-add the class. This is necessary because CSS animations don't restart when re-applied to the same element — the reflow trick forces the browser to treat it as a new animation. Using React state for this would cause unnecessary re-renders.

## 16. Mobile-First Responsive Cart (Phase 6)

The cart page items use `flex-col sm:flex-row` to stack vertically on mobile and go horizontal on desktop. Buttons are sized at `w-9 h-9` on mobile (44px touch target minimum per WCAG) and `w-8 h-8` on desktop. The "Place Order" and "Clear Cart" buttons also stack vertically on mobile with `flex-col sm:flex-row` and use `py-3` for comfortable tap targets.
