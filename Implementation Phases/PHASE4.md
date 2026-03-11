# Phase 4 — Cart + Token Wallet State

## Overview

Phase 4 wires up the cart and token wallet using React Context + `useReducer`.
After this phase, users can add/remove items, adjust quantities, see a live token
total, and have their wallet balance persist across page refreshes via localStorage.

---

## What We're Building

### 1. CartContext Provider (`context/CartContext.tsx`)

A single React Context that owns **both** cart items and wallet balance.

**State shape:**

```ts
interface CartState {
  items: CartItem[];      // items currently in the cart
  totalTokens: number;    // sum of (item.tokenPrice * quantity)
  wallet: TokenWallet;    // { balance: number }
}
```

**Reducer actions:**

| Action | Payload | Behavior |
|--------|---------|----------|
| `ADD_ITEM` | `MenuItem` | If item already in cart, increment quantity by 1. Otherwise add with quantity 1. Recalculate `totalTokens`. |
| `REMOVE_ITEM` | `string` (item id) | Remove the item entirely from the cart. Recalculate `totalTokens`. |
| `UPDATE_QUANTITY` | `{ id: string; quantity: number }` | Set the quantity for a specific item. If quantity is 0, remove it. Recalculate `totalTokens`. |
| `CLEAR_CART` | — | Empty the cart. Reset `totalTokens` to 0. |
| `DEDUCT_TOKENS` | `number` | Subtract the amount from `wallet.balance`. Used at checkout. |

**Action type definition:**

```ts
type CartAction =
  | { type: 'ADD_ITEM'; payload: MenuItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'DEDUCT_TOKENS'; payload: number };
```

**Exposed via context:**

```ts
interface CartContextValue {
  state: CartState;
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  deductTokens: (amount: number) => void;
  itemCount: number;   // total number of items (sum of quantities)
}
```

### 2. localStorage Persistence

- **Wallet balance** is persisted to `localStorage` under the key `claude-cafe-wallet`.
- On mount, read from localStorage. If no key exists, initialize to `STARTING_WALLET_BALANCE` (10,000).
- On every wallet change, write the new balance to localStorage.
- **Cart items are NOT persisted** — they reset on page refresh. This is intentional;
  stock was already decremented server-side on add, and restoring stale carts would
  create inventory inconsistencies. (Cart persistence is out of scope until Phase 6.)

### 3. Provider Wiring (`app/layout.tsx`)

Wrap the app's `{children}` in `<CartProvider>` inside the root layout so all pages
and components can access cart/wallet state.

```tsx
<body>
  <CartProvider>
    <Header />
    {children}
  </CartProvider>
</body>
```

### 4. TokenWallet Component (`components/TokenWallet.tsx`)

Displays the current wallet balance in the header.

- Shows a wallet/coins icon (from Lucide) + balance in `font-mono`
- Format: `10,000 tokens` (with comma separator)
- Lives inside the `<Header />` nav area, to the left of the cart icon

### 5. CartIcon Component (`components/CartIcon.tsx`)

A cart icon in the header that links to `/cart`.

- Uses the `ShoppingCart` icon from Lucide
- Shows a small coral badge with the total item count (sum of quantities)
- Badge is hidden when count is 0
- Links to `/cart`

### 6. Header Updates (`components/Header.tsx`)

Update the existing header to include:
- `<TokenWallet />` showing balance
- `<CartIcon />` with item count badge
- Both placed in the nav area (right side)

### 7. Wire MenuGrid "Add to Cart" (`components/MenuGrid.tsx`)

Replace the current `console.log` placeholder in `handleAddToCart` with:

1. Call the `checkStock()` server action to verify stock is available
2. Call the `decrementStock()` server action to atomically decrement stock
3. Call `addItem()` from the cart context to add the item to the cart
4. Show a brief visual confirmation (e.g., button text changes to "Added!" for 1 second)

**Error handling:**
- If stock check fails (out of stock), show an inline message and don't add
- If the user's wallet balance is less than the item's token price, don't add and
  show "Not enough tokens"

### 8. Types to Add (`types/index.ts`)

The `CartItem`, `Cart`, `TokenWallet`, and `STARTING_WALLET_BALANCE` already exist.
Add the `CartAction` and `CartState` types if not already present.

---

## File Changes Summary

| File | Action | What |
|------|--------|------|
| `context/CartContext.tsx` | **Create** | Context provider, reducer, helper functions |
| `components/TokenWallet.tsx` | **Create** | Wallet balance display for header |
| `components/CartIcon.tsx` | **Create** | Cart icon with item count badge |
| `components/Header.tsx` | **Modify** | Add TokenWallet + CartIcon to nav |
| `components/MenuGrid.tsx` | **Modify** | Wire `addItem` from context into `handleAddToCart` |
| `app/layout.tsx` | **Modify** | Wrap children in `<CartProvider>` |
| `types/index.ts` | **Modify** | Add `CartAction` and `CartState` types if needed |

---

## What This Phase Does NOT Include

- `/cart` page UI (Phase 5 — checkout flow)
- Order confirmation screen (Phase 5)
- Cart persistence to localStorage (Phase 6 — polish)
- Stock restoration on cart abandonment (Phase 6)
- Animations or transitions (Phase 6)

---

## Acceptance Criteria

1. Users can click "Add to Cart" on a menu item and see the cart count increment in the header
2. The wallet balance displays correctly in the header, starting at 10,000 tokens
3. Adding an item decrements stock in the database (via server action)
4. If an item is out of stock, the add-to-cart button is disabled and shows "Sold Out"
5. If the user doesn't have enough tokens, they get feedback and the item isn't added
6. The wallet balance persists across page refreshes via localStorage
7. Cart items are accessible from context anywhere in the app
8. The cart icon badge accurately reflects the total quantity of items in the cart
