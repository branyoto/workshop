import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';
import type { CartItem } from './types';

const STORAGE_KEY = 'artisan_cart';

type CartState = { items: CartItem[] };

type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  let next: CartState;
  switch (action.type) {
    case 'ADD_ITEM': {
      if (state.items.some(i => i.id === action.item.id)) return state;
      next = { items: [...state.items, action.item] };
      break;
    }
    case 'REMOVE_ITEM': {
      next = { items: state.items.filter(i => i.id !== action.id) };
      break;
    }
    case 'CLEAR_CART': {
      next = { items: [] };
      break;
    }
    case 'HYDRATE': {
      return { items: action.items };
    }
    default:
      return state;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next.items));
  } catch {
    // storage unavailable
  }
  return next;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { readonly children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const items = JSON.parse(raw) as CartItem[];
        dispatch({ type: 'HYDRATE', items });
      }
    } catch {
      // ignore corrupt data
    }
  }, []);

  const value: CartContextValue = {
    items: state.items,
    count: state.items.length,
    total: state.items.reduce((sum, i) => sum + i.priceSnapshot, 0),
    addItem: item => dispatch({ type: 'ADD_ITEM', item }),
    removeItem: id => dispatch({ type: 'REMOVE_ITEM', id }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

