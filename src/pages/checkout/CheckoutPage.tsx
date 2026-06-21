import { useForm } from '@tanstack/react-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useCart } from '../../services/providers/cart/useCart';
import { Button } from '../../common/Button';
import { EmptyState } from '../../common/EmptyState';
import { catalogUrl } from '../../routes/routePaths';
import { AddressInput } from './AddressInput';
import { checkoutSchema, type CheckoutFormData } from './schema';

interface FieldProps {
  label: string;
  error?: string;
  id: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ label, error, id, required, children }: Readonly<FieldProps>) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-900">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

interface CheckoutPageProps {
  onSubmit?: (data: CheckoutFormData) => Promise<void>;
  submitting?: boolean;
}

export function CheckoutPage({ onSubmit, submitting = false }: Readonly<CheckoutPageProps>) {
  const { t, i18n } = useTranslation();
  const { items, total } = useCart();

  const priceLabel = (amount: number) =>
    new Intl.NumberFormat(i18n.language === 'fr' ? 'fr-FR' : 'en-GB', { style: 'currency', currency: 'EUR' }).format(amount);

  const form = useForm({
    defaultValues: { name: '', email: '', phone: '', address: '', instructions: '' },
    validators: { onChange: checkoutSchema },
    onSubmit: async ({ value }) => {
      if (onSubmit) await onSubmit(value);
    },
  });

  if (items.length === 0) {
    return (
      <section aria-labelledby="checkout-heading">
        <h1 id="checkout-heading" className="sr-only">
          {t('pages.checkout.heading')}
        </h1>
        <EmptyState
          title={t('pages.checkout.emptyCart.title')}
          description={t('pages.checkout.emptyCart.description')}
          action={
            <Link
              to={catalogUrl()}
              className="inline-flex items-center justify-center rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-gray-900 hover:bg-secondary/80"
            >
              {t('pages.cart.empty.browseCatalog')}
            </Link>
          }
        />
      </section>
    );
  }

  return (
    <section aria-labelledby="checkout-heading">
      <h1 id="checkout-heading" className="text-3xl font-semibold text-gray-900">
        {t('pages.checkout.heading')}
      </h1>
      <div className="mt-6 flex flex-col gap-8 lg:flex-row">
        {/* Form */}
        <form
          className="flex flex-1 flex-col gap-4"
          data-testid="checkout-form"
          onSubmit={e => {
            e.preventDefault();
            form.handleSubmit();
          }}
          noValidate
        >
          <form.Field name="name">
            {field => (
              <Field
                label={t('pages.checkout.fields.name')}
                id="name"
                required
                error={field.state.meta.errors[0] ? t(`pages.checkout.errors.${field.state.meta.errors[0].message}`) : undefined}
              >
                <input
                  id="name"
                  type="text"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  required
                  autoComplete="name"
                  data-testid="checkout-name"
                  aria-describedby={field.state.meta.errors[0] ? 'name-error' : undefined}
                  className="rounded-lg border border-neutral/50 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="email">
            {field => (
              <Field
                label={t('pages.checkout.fields.email')}
                id="email"
                error={field.state.meta.errors[0] ? t(`pages.checkout.errors.${field.state.meta.errors[0].message}`) : undefined}
              >
                <input
                  id="email"
                  type="email"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="email"
                  data-testid="checkout-email"
                  aria-describedby={field.state.meta.errors[0] ? 'email-error' : undefined}
                  className="rounded-lg border border-neutral/50 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="phone">
            {field => (
              <Field
                label={t('pages.checkout.fields.phone')}
                id="phone"
                error={field.state.meta.errors[0] ? t(`pages.checkout.errors.${field.state.meta.errors[0].message}`) : undefined}
              >
                <input
                  id="phone"
                  type="tel"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  autoComplete="tel"
                  data-testid="checkout-phone"
                  aria-describedby={field.state.meta.errors[0] ? 'phone-error' : undefined}
                  className="rounded-lg border border-neutral/50 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="address">
            {field => (
              <Field
                label={t('pages.checkout.fields.address')}
                id="address"
                required
                error={field.state.meta.errors[0] ? t(`pages.checkout.errors.${field.state.meta.errors[0].message}`) : undefined}
              >
                <AddressInput
                  id="address"
                  value={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                  required
                  placeholder={t('pages.checkout.fields.addressPlaceholder')}
                  aria-describedby={field.state.meta.errors[0] ? 'address-error' : undefined}
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="instructions">
            {field => (
              <Field label={t('pages.checkout.fields.instructions')} id="instructions">
                <textarea
                  id="instructions"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  rows={3}
                  className="rounded-lg border border-neutral/50 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </Field>
            )}
          </form.Field>

          <Button type="submit" variant="primary" className="mt-2 w-full" data-testid="checkout-submit" disabled={submitting}>
            {submitting ? t('common.loading') : t('pages.checkout.submit')}
          </Button>
        </form>

        {/* Order summary */}
        <aside className="w-full lg:w-80">
          <div className="rounded-xl border border-neutral/40 p-4">
            <h2 className="mb-3 text-base font-semibold">{t('pages.checkout.summary.title')}</h2>
            <ul className="flex flex-col gap-3">
              {items.map(item => (
                <li key={item.id} className="flex items-center gap-3">
                  <img src={item.thumbnailUrl} alt="" aria-hidden="true" className="h-12 w-12 rounded-md object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item.titleSnapshot}</p>
                    <p className="text-sm text-gray-600">{priceLabel(item.priceSnapshot)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-neutral/40 pt-3">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>{t('pages.checkout.summary.total')}</span>
                <span>{priceLabel(total)}</span>
              </div>
              <p className="mt-2 text-xs text-gray-500">{t('pages.checkout.summary.deliveryNote')}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
