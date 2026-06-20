import { createContext } from 'react';

export interface CartItem {
  id: string;
  titleSnapshot: string;
  priceSnapshot: number;
  thumbnailUrl: string;
}

export interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);