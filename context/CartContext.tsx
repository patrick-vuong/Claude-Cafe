'use client';

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { MenuItem, CartState, CartAction } from '@/types';
import { STARTING_WALLET_BALANCE } from '@/types';

const WALLET_STORAGE_KEY = 'claude-cafe-wallet';

function calcTotal(items: CartState['items']): number {
  return items.reduce((sum, ci) => sum + ci.menuItem.tokenPrice * ci.quantity, 0);
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (ci) => ci.menuItem.id === action.payload.id,
      );
      const items = existing
        ? state.items.map((ci) =>
            ci.menuItem.id === action.payload.id
              ? { ...ci, quantity: ci.quantity + 1 }
              : ci,
          )
        : [...state.items, { menuItem: action.payload, quantity: 1 }];
      return { ...state, items, totalTokens: calcTotal(items) };
    }

    case 'REMOVE_ITEM': {
      const items = state.items.filter(
        (ci) => ci.menuItem.id !== action.payload,
      );
      return { ...state, items, totalTokens: calcTotal(items) };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const items =
        quantity <= 0
          ? state.items.filter((ci) => ci.menuItem.id !== id)
          : state.items.map((ci) =>
              ci.menuItem.id === id ? { ...ci, quantity } : ci,
            );
      return { ...state, items, totalTokens: calcTotal(items) };
    }

    case 'CLEAR_CART':
      return { ...state, items: [], totalTokens: 0 };

    case 'DEDUCT_TOKENS':
      return {
        ...state,
        wallet: { balance: state.wallet.balance - action.payload },
      };

    case 'RESET_WALLET':
      return {
        ...state,
        items: [],
        totalTokens: 0,
        wallet: { balance: STARTING_WALLET_BALANCE },
      };

    default:
      return state;
  }
}

interface CartContextValue {
  state: CartState;
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  deductTokens: (amount: number) => void;
  resetWallet: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalTokens: 0,
    wallet: { balance: STARTING_WALLET_BALANCE },
  });

  // Hydrate wallet from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(WALLET_STORAGE_KEY);
    if (stored !== null) {
      const balance = Number(stored);
      if (!Number.isNaN(balance)) {
        const delta = state.wallet.balance - balance;
        if (delta !== 0) {
          dispatch({ type: 'DEDUCT_TOKENS', payload: delta });
        }
      }
    }
    setHydrated(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist wallet to localStorage on change
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(WALLET_STORAGE_KEY, String(state.wallet.balance));
    }
  }, [state.wallet.balance, hydrated]);

  const itemCount = state.items.reduce((sum, ci) => sum + ci.quantity, 0);

  const value: CartContextValue = {
    state,
    addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
    removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
    updateQuantity: (id, quantity) =>
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    deductTokens: (amount) =>
      dispatch({ type: 'DEDUCT_TOKENS', payload: amount }),
    resetWallet: () => dispatch({ type: 'RESET_WALLET' }),
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a <CartProvider>');
  }
  return ctx;
}
