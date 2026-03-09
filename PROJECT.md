# Claude Café — Project Specification

## Vision

Claude Café is a whimsical digital coffee shop themed around Claude Code and the broader
AI agent ecosystem. Tokens replace dollars as the in-app currency — a playful, on-brand
nod to LLM token usage. Users browse a warm, cozy menu, add items to a cart that
displays live token totals, and complete a "checkout" that generates a terminal-style
order confirmation.

The project serves dual purposes: a beautiful branded experience for the Claude community
and a showcase of clean Next.js/TypeScript/Tailwind architecture.

---

## Token Economy

- **Purely cosmetic** — no real transactions, no payment APIs, no backend required
- **Conversion rate:** 100 tokens ≈ $1.00 (so a $4.50 latte = 450 tokens)
- **Starting wallet:** every user session begins with 10,000 tokens
- **Wallet behavior:** deducted on order confirmation; persisted in localStorage for the session
- Token prices are displayed in monospace font to evoke a terminal/API aesthetic

---

## Full Menu

### ☕ Espresso & Coffee

| Item | Description | Tokens |
|------|-------------|--------|
| System Prompt Espresso | Bold, sets the tone for your whole session | 350 |
| Prompt Latte | Smooth instructions with a frothy finish | 450 |
| Chain-of-Thought Cold Brew | Slow-steeped clarity, served iced | 500 |
| Context Window Americano | Wide-open flavor, room for everything | 400 |
| Hallucination Hazelnut | Occasionally surprising, always interesting | 475 |

### 🍵 Teas & Alternatives

| Item | Description | Tokens |
|------|-------------|--------|
| RAG Refresher Iced Tea | Retrieval-augmented hibiscus, served cold | 425 |
| Temperature Zero Matcha | Cool, precise, zero randomness | 450 |
| Streaming Chamomile | Arrives token by token, worth the wait | 375 |

### 🥐 Pastries & Bites

| Item | Description | Tokens |
|------|-------------|--------|
| Token Croissant | Light, flaky, cost-efficient | 250 |
| Fine-Tuned Danish | Customized to your exact taste | 325 |
| Memory Upgrade Muffin | Helps you retain everything | 300 |
| Embedding Éclair | Dense with meaning on the inside | 350 |

### ⚡ Agent Boosters

| Item | Description | Tokens |
|------|-------------|--------|
| Parallel Processing Pack | Assorted snacks, run simultaneously | 750 |
| Tool Use Toolkit | Everything you need to take action | 650 |
| Max Tokens Energy Shot | Pushes your output to the limit | 200 |
| Context Refill | Top off your session with clarity | 150 |

### 🌟 Claude Specials

| Item | Description | Tokens |
|------|-------------|--------|
| Opus Blend | The most capable cup we offer | 900 |
| Sonnet Pour-Over | Balanced, thoughtful, beautifully crafted | 600 |
| Haiku Espresso Shot | Small but precise — says everything | 250 |
| The Artifacts Board | A curated seasonal selection | 1200 |

---

## Page Architecture

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home | Hero section, featured items, café vibe/mood |
| `/menu` | Menu | Full menu with category tabs + item grid |
| `/cart` | Cart | Review cart, see token totals, proceed to order |
| `/order-confirmed` | Confirmation | Terminal-style receipt, order ID, thank you |

---

## Key Components

| Component | Responsibility |
|-----------|---------------|
| `<TokenWallet />` | Displays current balance in header; updates on purchase |
| `<MenuGrid />` | Renders a responsive grid of `<MenuItemCard />` components |
| `<MenuItemCard />` | Shows name, description, token price, image, add-to-cart button |
| `<CartSidebar />` | Sliding drawer from the right; shows items, quantities, total |
| `<CategoryTabs />` | Filters the menu grid by category; highlighted active tab |
| `<Header />` | Site nav with logo, wallet, cart icon with item count badge |

---

## Data Models

```ts
type MenuCategory =
  | 'espresso'
  | 'tea'
  | 'pastries'
  | 'boosters'
  | 'specials';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  tokenPrice: number;
  stock: number;
  image?: string;
  tags?: string[];
  featured?: boolean;
}

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  totalTokens: number;
}

interface TokenWallet {
  balance: number;
}
```

---

## Server Actions

| Action | File | Purpose |
|--------|------|---------|
| `getMenuItems()` | `app/actions/menu.ts` | Fetch all items with stock from DB |
| `decrementStock(itemId)` | `app/actions/menu.ts` | Atomically reduce stock when item added to cart |
| `checkStock(itemId)` | `app/actions/menu.ts` | Verify item still in stock before adding |
| `placeOrder(items, total)` | `app/actions/orders.ts` | Create Order + OrderItems records |

---

## Prisma Schema

Three models: `MenuItem`, `Order`, `OrderItem`.

- `MenuItem` — stores all menu data + live `stock` count (default 50). `available` flag set to false when stock hits 0.
- `Order` — stores completed orders with a human-readable `orderRef` (e.g. `ORD-4a2f`) and `totalTokens`.
- `OrderItem` — join table linking orders to menu items with quantity.

See `prisma/schema.prisma` for the full schema.

---

## Inventory UX

- Each item starts with **50 stock** (seeded via `prisma/seed.ts`)
- Stock count displayed on `<MenuItemCard />` — e.g. "12 remaining"
- When stock = 0, card shows "Out of Stock" and disables add-to-cart
- Stock decrements when item is **added to cart** (not at checkout)
- Stock does NOT auto-restore if cart is abandoned (Phase 6 polish)

---

## Design System

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Cream | `#F5ECD7` | Primary background |
| Off-white | `#FAF6F0` | Card backgrounds, light surfaces |
| Espresso | `#2C1810` | Primary text, headings |
| Claude Coral | `#E06C4B` | Primary accent, CTA buttons, highlights |
| Amber | `#D4956A` | Secondary accent, hover states, borders |
| Warm Gray | `#8B7355` | Secondary text, muted labels |

### Typography

| Role | Font | Notes |
|------|------|-------|
| Display / Headings | Playfair Display | Serif, warm, editorial |
| Body / UI | Inter | Clean sans-serif, excellent readability |
| Token Prices | `font-mono` (system) | Evokes terminal/API aesthetic |

### Design Principles

- **Warm and cozy** — soft shadows, rounded corners, cream backgrounds
- **AI-native accents** — monospace token prices, terminal-style order IDs (e.g. `#ORD-4a2f`)
- **Subtle depth** — light drop shadows on cards, gentle hover lifts
- **No dark mode** unless explicitly requested — this is a warm, daylit café
- **Brand-consistent** — only Claude/Anthropic palette; no generic blues or corporate grays

---

## State Management

Cart and wallet state live in a React Context (`CartContext`) with `useReducer`:

```ts
type CartAction =
  | { type: 'ADD_ITEM'; payload: MenuItem }
  | { type: 'REMOVE_ITEM'; payload: string }   // item id
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'DEDUCT_TOKENS'; payload: number };
```

Wallet balance persists to `localStorage` so it survives page refreshes within a session.
It resets to 10,000 on a fresh browser session (no localStorage key present).

---

## Development Roadmap

| Phase | Description | Status | Spec |
|-------|-------------|--------|------|
| 1 | Documentation — README, PROJECT.md, CLAUDE.md | ✅ Complete | `PHASE1.md` |
| 2 | Next.js scaffold + Tailwind + Supabase DB + Prisma ORM | ✅ Complete | `PHASE2.md` |
| 3 | Menu page + data fetching from DB | ✅ Complete | `PHASE3.md` |
| 4 | Cart + token wallet state (Context + useReducer) | ✅ Complete | `PHASE4.md` |
| 5 | Checkout flow + order confirmation screen | ✅ Complete | `PHASE5.md` |
| 6 | Polish — animations, mobile, accessibility | 🔜 Next | `PHASE6.md` |

---

## Out of Scope

- Real payment processing (Stripe, etc.) — **never add this**
- User accounts or authentication
- Dark mode (unless explicitly requested in a future phase)
