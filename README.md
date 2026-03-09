```
  ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗
 ██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝
 ██║     ██║     ███████║██║   ██║██║  ██║█████╗
 ██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝
 ╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗
  ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝

         ☕  C A F É
```

# Claude Café

> **Where agents come to recharge.**

A warm, cozy digital coffee shop themed around Claude Code and Anthropic's AI ecosystem.
Browse the menu, add items to your cart, and check out — all priced in **tokens**, a playful
nod to how LLMs actually think about cost.

---

## What Is This?

Claude Café is a front-end web app that doubles as a branded experience for the Claude
Code community. Instead of dollars, every item on the menu is priced in **tokens** — a
cosmetic marketing layer that maps roughly 100 tokens to $1.00. Think of it as a fun way
to engage with the Anthropic universe while exploring a beautifully crafted café UI.

The vibe: warm wood tones, soft lighting, serif headings, and just enough terminal
aesthetic to remind you you're in an AI-native space.

---

## Features

- **Token Wallet** — Start with 10,000 tokens; your balance updates as you shop
- **Full Menu** — 20+ items across 5 categories (Espresso, Tea, Pastries, Agent Boosters, Claude Specials)
- **Cart Sidebar** — Sliding drawer with live token totals
- **Order Confirmation** — Terminal-style receipt with a unique order ID
- **Warm Brand Palette** — Cream, espresso, Claude coral, and amber throughout
- **Responsive Layout** — Works on desktop and mobile

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| State | React Context + useReducer |
| Fonts | Playfair Display (display), Inter (body) |
| Icons | Lucide React |
| Package Manager | npm |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Build for production
npm run build

# Run production build
npm start
```

---

## Project Structure

```
claude-cafe/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home / landing page
│   ├── menu/page.tsx       # Full menu with category tabs
│   ├── cart/page.tsx       # Cart review
│   └── order-confirmed/    # Post-order success screen
├── components/             # Reusable UI components
│   ├── TokenWallet.tsx     # Header balance display
│   ├── MenuGrid.tsx        # Item card grid
│   ├── MenuItemCard.tsx    # Individual item card
│   ├── CartSidebar.tsx     # Sliding cart drawer
│   └── CategoryTabs.tsx    # Menu category filter
├── context/                # React Context providers
│   └── CartContext.tsx     # Cart + wallet state
├── data/                   # Static data
│   └── menu.ts             # Full menu item definitions
├── types/                  # TypeScript types
│   └── index.ts            # MenuItem, CartItem, Cart, etc.
└── public/                 # Static assets
```

---

## Token Economy

Tokens are a **cosmetic/marketing layer** — no real money changes hands.

| Real Price | Token Price | Conversion |
|-----------|-------------|------------|
| $1.00 | 100 tokens | 100× |
| $3.50 | 350 tokens | — |
| $9.00 | 900 tokens | — |

Every user starts with a simulated wallet of **10,000 tokens** (~$100 equivalent).
This is purely a UX device to make the shopping flow feel complete and on-brand with
how the AI world talks about cost.

---

## License & Credits

MIT License — free to use, remix, and build on.

Built with Claude Code. Inspired by the Anthropic developer community.
Branding and token theme are a love letter to the LLM ecosystem.

**Claude** and the Claude brand are trademarks of Anthropic, PBC.
This project is a fan/community creation and is not officially affiliated with Anthropic.
