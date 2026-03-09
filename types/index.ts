// Menu
export type MenuCategory =
  | 'espresso'
  | 'tea'
  | 'pastries'
  | 'boosters'
  | 'specials';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  tokenPrice: number;
  stock: number;
  image: string | null;
  tags: string[];
  featured: boolean;
  available: boolean;
  createdAt: Date;
}

// Cart
export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalTokens: number;
}

// Wallet
export interface TokenWallet {
  balance: number;
}

// Category display config
export const CATEGORY_MAP: Record<MenuCategory, { label: string; emoji: string }> = {
  espresso: { label: 'Espresso & Coffee', emoji: '☕' },
  tea: { label: 'Teas & Alternatives', emoji: '🍵' },
  pastries: { label: 'Pastries & Bites', emoji: '🥐' },
  boosters: { label: 'Agent Boosters', emoji: '⚡' },
  specials: { label: 'Claude Specials', emoji: '🌟' },
};

export const STARTING_WALLET_BALANCE = 10_000;

// Cart state management
export type CartAction =
  | { type: 'ADD_ITEM'; payload: MenuItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'DEDUCT_TOKENS'; payload: number }
  | { type: 'RESET_WALLET' };

export interface CartState {
  items: CartItem[];
  totalTokens: number;
  wallet: TokenWallet;
}
