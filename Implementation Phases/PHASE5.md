# Phase 5 — Checkout Flow + Order Confirmation

**Status:** Complete

## Overview

Phase 5 wired up the full checkout flow: the cart page's "Place Order" button now calls
the `placeOrder()` server action, deducts tokens from the wallet, clears the cart, and
navigates to a terminal-style order confirmation receipt.

---

## What Was Built

### 1. Cart Page Checkout Logic (`app/cart/page.tsx`)

Updated the Phase 4 cart page to handle real checkout:

- **`handlePlaceOrder()` async function** — runs three sequential steps:
  1. Calls `placeOrder()` server action → writes Order + OrderItems to Supabase in a transaction
  2. Calls `deductTokens(totalTokens)` → subtracts from client-side wallet
  3. Calls `clearCart()` + `router.push()` → clears cart and navigates to confirmation
- **Error isolation** — if step 1 fails, steps 2 and 3 never run (wallet + cart stay intact)
- **Loading state** — button shows spinner + "Placing Order..." while processing
- **Disabled state** — button disabled when wallet balance < cart total, or while placing
- **Error display** — inline coral error message if something goes wrong

### 2. Order Confirmation Page (`app/order-confirmed/page.tsx`)

Terminal-style receipt page with dark espresso background:

- **Success icon** — Coffee icon in a coral circle
- **Heading** — "Order Placed!" with friendly subtext
- **Terminal receipt** — monospace font on dark background:
  - Café name + tagline header
  - Order reference: `#ORD-xxxx` in coral
  - Timestamp: formatted date + time
  - Total charged in tokens
  - Remaining wallet balance
  - Footer: "--- END OF RECEIPT ---"
- **Actions** — "Order Again" (→ `/menu`) and "Back to Home" (→ `/`) buttons
- **Data passing** — order ref and total passed via URL search params (`?ref=ORD-xxxx&total=450`)

---

## Checkout Flow

```
Cart Page                    Server                     Confirmation Page
─────────                    ──────                     ─────────────────
Click "Place Order"
  │
  ├─→ placeOrder() ────────→ BEGIN TRANSACTION
  │                           Create Order record
  │                           Create OrderItem records
  │                         COMMIT
  │                    ←──── { orderRef: "ORD-4a2f" }
  │
  ├─→ deductTokens(total)   (client-side reducer)
  ├─→ clearCart()            (client-side reducer)
  ├─→ localStorage update    (wallet persistence)
  │
  └─→ router.push() ──────────────────────────────────→ Display receipt
                                                         Read ?ref and ?total
                                                         Show wallet balance
```

---

## Key Decisions Made

1. **Button, not Link** — replaced `<Link href="/order-confirmed">` with a `<button>` that runs async logic before navigating
2. **URL search params** — order ref and total passed via URL to avoid needing server-side session state or another DB query
3. **Sequential error handling** — DB write must succeed before any client state changes
4. **No confirmation dialog** — single-click checkout (tokens are cosmetic, low stakes)
5. **Spinner feedback** — Lucide `Loader2` with `animate-spin` for loading state

---

## Files Created / Modified

| File | Action | What |
|------|--------|------|
| `app/cart/page.tsx` | **Modified** | Added `handlePlaceOrder()`, loading/error states, replaced Link with button |
| `app/order-confirmed/page.tsx` | **Created** | Terminal-style receipt with order ref, total, balance |
