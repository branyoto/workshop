import { type ReactNode, useEffect, useMemo, useReducer } from 'react';
import { CartContext, type CartContextValue, type CartItem } from './CartContext';

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

  const value: CartContextValue = useMemo(
    () => ({
      items: state.items,
      count: state.items.length,
      total: state.items.reduce((sum, i) => sum + i.priceSnapshot, 0),
      addItem: item => dispatch({ type: 'ADD_ITEM', item }),
      removeItem: id => dispatch({ type: 'REMOVE_ITEM', id }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    }),
    [state, dispatch],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
