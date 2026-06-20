import type { CartItem } from '../cart/CartContext';
import type { CheckoutFormData } from '../pages/checkout/schema';

export interface OrderPayload {
  orderNumber: string;
  items: CartItem[];
  total: number;
  customer: CheckoutFormData;
  artistEmail: string;
}

export interface OrderAdapter {
  submit(payload: OrderPayload): Promise<void>;
}

/** Generate a CMD-YYYYMMDD-XXXX order number */
export function generateOrderNumber(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replaceAll('-', '');
  const suffix = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return `CMD-${date}-${suffix}`;
}

const ORDER_HISTORY_KEY = 'artisan_order_history';

export function saveOrderToHistory(orderNumber: string): void {
  try {
    const raw = localStorage.getItem(ORDER_HISTORY_KEY);
    const history: string[] = raw ? (JSON.parse(raw) as string[]) : [];
    history.unshift(orderNumber);
    localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(history));
  } catch {
    // ignore
  }
}

export function getOrderHistory(): string[] {
  try {
    const raw = localStorage.getItem(ORDER_HISTORY_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

