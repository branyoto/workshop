import emailjs from '@emailjs/browser';
import type { OrderAdapter, OrderPayload } from '../orders/orderAdapter.ts';

export function createEmailJsAdapter(): OrderAdapter {
  return {
    async submit(payload: OrderPayload): Promise<void> {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS environment variables are not configured');
      }

      const itemLines = payload.items
        .map(i => `- ${i.titleSnapshot}: ${i.priceSnapshot.toFixed(2)} €`)
        .join('\n');

      const templateParams = {
        to_email: payload.artistEmail,
        order_number: payload.orderNumber,
        customer_name: payload.customer.name,
        customer_email: payload.customer.email || '—',
        customer_phone: payload.customer.phone || '—',
        customer_address: payload.customer.address,
        customer_instructions: payload.customer.instructions || '—',
        item_list: itemLines,
        total: `${payload.total.toFixed(2)} €`,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
    },
  };
}

