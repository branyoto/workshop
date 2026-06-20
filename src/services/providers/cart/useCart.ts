import { CartContext, type CartContextValue } from './CartContext';
import { useContext } from 'react';

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
