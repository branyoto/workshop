import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../services/providers/cart/useCart';
import { Snackbar } from '../../common/Snackbar';
import { Button } from '../../common/Button';
import { useCms } from '../cms/useCms';
import { generateOrderNumber, saveOrderToHistory } from '../../services/orders/orderAdapter';
import { createEmailJsAdapter } from '../../services/email/emailjsAdapter.ts';
import type { CheckoutFormData } from './schema';
import { CheckoutPage } from './CheckoutPage';
import { OrderConfirmation } from './OrderConfirmation';

export function CheckoutRoute() {
  const { t } = useTranslation();
  const { data: cms } = useCms();
  const { items, total, clearCart } = useCart();
  const [confirmedOrder, setConfirmedOrder] = useState<string | null>(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (data: CheckoutFormData) => {
    if (!cms) return;
    setPending(true);
    const orderNumber = generateOrderNumber();
    const adapter = createEmailJsAdapter();

    try {
      await adapter.submit({
        orderNumber,
        items,
        total,
        customer: data,
        artistEmail: cms.settings.artistEmail,
      });
      saveOrderToHistory(orderNumber);
      clearCart();
      setConfirmedOrder(orderNumber);
    } catch {
      setErrorOpen(true);
    } finally {
      setPending(false);
    }
  };

  if (confirmedOrder) {
    return <OrderConfirmation orderNumber={confirmedOrder} />;
  }

  return (
    <>
      <CheckoutPage onSubmit={handleSubmit} submitting={pending} />
      <Snackbar
        open={errorOpen}
        message={t('pages.checkout.error.message')}
        onClose={() => setErrorOpen(false)}
        action={
          <Button variant="ghost" className="px-2 py-1 text-xs text-white" onClick={() => setErrorOpen(false)}>
            {t('common.retry')}
          </Button>
        }
      />
    </>
  );
}
