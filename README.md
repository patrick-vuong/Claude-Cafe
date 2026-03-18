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
## Come visit [Claude Cafe](https://claude-cafe.vercel.app/) today !!
Creator: Patrick Vuong
Website: https://claude-cafe.vercel.app/


> **Where agents come to recharge.**

Digital coffee shop themed around Claude Code and Anthropic's AI ecosystem.
Browse the menu, add items to your cart, and check out! All items are priced in **tokens**, a playful
nod to how LLMs actually think about cost.

---

## Option A: Interactive Tutorial
### **[Interactive Tutorial link](https://github.com/patrick-vuong/Claude-Cafe/blob/main/Claude-Skills-Tutorial-Overview-Training-Up-Cafe-Agent/Claude-Skills-Tutorial-Full-Training-Up-Cafe-Agent.md)**
**Objective**: Teach what is Skills and how to add them to Claude

### Narrative & Analogy: 

**Analogy** | teaching skills to Claude to execute work the way you would is similar to the analogy of training up a new hire or an employee.

**Before** | Agents are great out of the box. Claude can read code, answer questions, and generate files. But here's the problem: Without skills, Claude does things its way. With skills, Claude does things your way.

**After** | Agents trained up with skills will execute in a repeatable, predictable, and referencing the best practices just like the outcome of training an employee

### Simplifying Complex Concepts: 
New Employee Claude has a Kitchen (Model Context Protocol) & Recipe (Skills) to work efficiently with Agentic Workflows

We treat Claude Code like a **AI teammate** as we have gone from pair programming to peer programming. What makes a productive is software development lifecycle are the developer tools  that help us go about different tasks ex. testing with Playwright. 

---
**Imagine this:** Similar in our analogy of Claude Cafe - Claude needs great tools in the kitchen to achieve tasks for the cafe

**Kitchen Tools | MCP**: is our MCP where Claude can connect to different tools and complete agentic workflows

**Recipes | Skills**: is our skills that teach Claude workflows and best practices 

**Result: Smooth Efficient Kitchen** Claude can perform agentic workflows with the tools that are right for the job and in the way you would do it and adhering all the best practices. 

---
### Progressive Learning: 
In the tutorial we go through these stages building on each other.

| Stage | What We Did | What Claude Learned |
|-------|-------------|---------------------|
| **Setup** | Installed Claude Code, cloned the repo & created the skills folder | How to prepare a workspace for skill-based development |
| **Module 1** | Created the `explain-code` skill | How to deeply understand any codebase on command |
| **Module 2** | Connected Playwright MCP + ran browser tests | Kitchen (MCP) and Recipes (Skills) |
| **Module 3** | Built the `test-cafe` skill with 2 sub-agents | How to create repeatable, MCP and Skill workflows |

---
---

## What Is This?

Claude Café is a front-end web app that doubles as a branded experience for the Claude
Code community. Instead of dollars, every item on the menu is priced in **tokens** — a
cosmetic marketing layer that maps roughly 100 tokens to $1.00. Think of it as a fun way
to engage with the Anthropic universe while exploring a beautifully crafted café UI.


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
## ASCII

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLAUDE CAFE - Architecture                   │
└─────────────────────────────────────────────────────────────────────┘

  ┌───────────────── BROWSER (Client) ──────────────────┐
  │                                                      │
  │  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
  │  │  /       │  │  /menu   │  │  /order-confirmed │  │
  │  │  Home    │  │  Menu    │  │  Success Page     │  │
  │  │  (hero,  │  │  (tabs,  │  │  (terminal-style  │  │
  │  │featured) │  │  grid)   │  │   order receipt)  │  │
  │  └────┬─────┘  └────┬─────┘  └───────────────────┘  │
  │       │              │               ▲               │
  │       └──────┬───────┘               │               │
  │              ▼                       │               │
  │  ┌──────────────────────┐   ┌───────┴────────┐      │
  │  │   React Context      │   │   /cart         │      │
  │  │   (CartContext.tsx)   │◄──┤   Cart Page     │      │
  │  │                      │   │   (review &     │      │
  │  │  • items[]           │   │    checkout)    │      │
  │  │  • totalTokens       │   └────────────────┘      │
  │  │  • walletBalance     │                            │
  │  │  • useReducer        │                            │
  │  │  • localStorage      │                            │
  │  └──────────────────────┘                            │
  └──────────────────────┬───────────────────────────────┘
                         │
                    Server Actions
                    (fetch menu /
                     place order)
                         │
  ┌──────────────────────▼───────────────────────────────┐
  │              NEXT.JS SERVER (App Router)              │
  │                                                      │
  │  ┌────────────────────┐  ┌────────────────────────┐  │
  │  │ actions/menu.ts    │  │ actions/orders.ts      │  │
  │  │                    │  │                        │  │
  │  │ • getMenuItems()   │  │ • createOrder()        │  │
  │  │ • getCategories()  │  │   - validate stock     │  │
  │  │ • decrementStock() │  │   - decrement stock    │  │
  │  │                    │  │   - generate #ORD-xxxx │  │
  │  └────────┬───────────┘  └───────────┬────────────┘  │
  │           │                          │               │
  │           └────────────┬─────────────┘               │
  │                        ▼                             │
  │              ┌──────────────────┐                    │
  │              │   Prisma Client  │                    │
  │              │   (lib/db.ts)    │                    │
  │              └────────┬─────────┘                    │
  └───────────────────────┼──────────────────────────────┘
                          │
                          ▼
  ┌───────────────────────────────────────────────────────┐
  │              SUPABASE (PostgreSQL)                    │
  │                                                      │
  │  ┌──────────────┐ ┌──────────┐ ┌──────────────────┐  │
  │  │  MenuItem     │ │  Order   │ │  OrderItem       │  │
  │  │              │ │          │ │                  │  │
  │  │ id           │ │ id       │ │ id               │  │
  │  │ name         │ │ orderRef │ │ orderId ─────►   │  │
  │  │ description  │ │ total    │ │ menuItemId ──►   │  │
  │  │ category     │ │ created  │ │ quantity         │  │
  │  │ tokenPrice   │ │ items[]  │ │                  │  │
  │  │ stock        │ └──────────┘ └──────────────────┘  │
  │  │ featured     │                                    │
  │  │ tags[]       │                                    │
  │  └──────────────┘                                    │
  └───────────────────────────────────────────────────────┘
```

```
  ═══════════════════ USER FLOW ═══════════════════

  ┌─────┐    ┌──────┐    ┌──────┐    ┌─────────┐    ┌───────────┐
  │Home │───►│ Menu │───►│ Cart │───►│Checkout │───►│  Order    │
  │  /  │    │/menu │    │/cart │    │(action) │    │ Confirmed │
  └─────┘    └──────┘    └──────┘    └─────────┘    └───────────┘
               │                        │               │
               │ Browse by              │ Server        │ Terminal-
               │ category               │ Action:       │ style
               │ tabs                   │ createOrder() │ receipt
               │                        │ deduct stock  │ #ORD-4a2f
               │ Add to cart ──►        │ deduct tokens │
               │ (Context)              │               │
               ▼                        ▼               ▼
          ┌──────────┐          ┌──────────────┐  ┌──────────┐
          │ Wallet:  │          │ Stock updated│  │ "Thanks  │
          │ 10,000 ◄─┼─deduct──┤ in Supabase  │  │  for your│
          │ tokens   │          │ via Prisma   │  │  order!" │
          └──────────┘          └──────────────┘  └──────────┘
```
Client state (cart, wallet) lives in React Context + localStorage — no auth needed
Server state (menu items, orders, stock) lives in Supabase PostgreSQL, accessed only through Server Actions via Prisma
Tokens are purely cosmetic (100 tokens ~ $1.00) — no real payment processing

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
