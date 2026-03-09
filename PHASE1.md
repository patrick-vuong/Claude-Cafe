# Phase 1 — Documentation

**Status:** Complete

## Overview

Phase 1 established the project's foundation through documentation before writing any code.
Every design decision, data model, component spec, and convention was defined upfront so
that all subsequent phases could reference a single source of truth.

---

## What Was Built

### 1. README.md

Public-facing overview of Claude Café:
- Project description and vision
- Tech stack summary
- Setup instructions (`npm install`, `npm run dev`)
- Environment variable reference
- Screenshots placeholder

### 2. PROJECT.md

Full creative and technical specification:
- **Vision statement** — whimsical digital coffee shop themed around Claude Code
- **Token economy** — cosmetic currency, 100 tokens ≈ $1.00, 10,000 starting balance
- **Full menu** — 20 items across 5 categories with names, descriptions, and token prices
- **Page architecture** — 4 routes (`/`, `/menu`, `/cart`, `/order-confirmed`)
- **Component spec** — 6 key components with responsibilities
- **Data models** — TypeScript interfaces for MenuItem, CartItem, Cart, TokenWallet
- **Server actions** — 4 actions for menu queries and order creation
- **Prisma schema** — 3 models (MenuItem, Order, OrderItem)
- **Inventory UX** — stock behavior, decrement-on-add strategy
- **Design system** — 6-color palette, 3 font roles, design principles
- **State management** — CartAction union type, localStorage persistence plan
- **Development roadmap** — 6-phase plan

### 3. CLAUDE.md

Working instructions for Claude Code:
- Tech stack table
- Project structure tree
- Coding conventions (TypeScript, naming, styling, components)
- Design system reference (colors, typography)
- Key design decisions to respect
- DO NOT list (guardrails)
- Run commands and environment variables

---

## Key Decisions Made

1. **Tokens are cosmetic only** — no real payment APIs, ever
2. **Tailwind only** — no CSS modules, no inline styles
3. **Warm café aesthetic** — cream, espresso, coral, amber palette
4. **No dark mode** unless explicitly requested
5. **Terminal accents** — monospace prices, `#ORD-xxxx` order IDs
6. **Documentation-first** — spec everything before coding

---

## Files Created

| File | Purpose |
|------|---------|
| `README.md` | Public-facing project overview |
| `PROJECT.md` | Full creative + technical specification |
| `CLAUDE.md` | Claude Code working instructions |
