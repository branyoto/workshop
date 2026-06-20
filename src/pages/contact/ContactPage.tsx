import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Button } from '../../common/Button';
import { Snackbar } from '../../common/Snackbar';
import { useCms } from '../cms/useCms';
import { useLocalize } from '../cms/useLocalize';

const contactSchema = z.object({
  name: z.string().min(1, 'required'),
  email: z.string().email('invalidEmail'),
  message: z.string().min(1, 'required'),
});

type ContactFormData = z.infer<typeof contactSchema>;

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

export function ContactPage() {
  const { t } = useTranslation();
  const l = useLocalize();
  const { data: cms } = useCms();
  const [success, setSuccess] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const form = useForm({
    defaultValues: { name: '', email: '', message: '' } as ContactFormData,
    validators: { onChange: contactSchema },
    onSubmit: async ({ value }) => {
      if (!cms) return;
      setPending(true);
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
      const contactTemplateId = (import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID ?? import.meta.env.VITE_EMAILJS_TEMPLATE_ID) as string;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
      try {
        if (serviceId && contactTemplateId && publicKey) {
          const emailjs = await import('@emailjs/browser');
          await emailjs.default.send(
            serviceId,
            contactTemplateId,
            { to_email: cms.settings.artistEmail, from_name: value.name, from_email: value.email, message: value.message },
            publicKey,
          );
        }
        setSuccess(true);
      } catch {
        setErrorOpen(true);
      } finally {
        setPending(false);
      }
    },
  });

  const sortedMarkets = cms ? [...cms.contact.markets].sort((a, b) => a.date.localeCompare(b.date)) : [];
  const futureMarkets = sortedMarkets.filter(m => m.date >= new Date().toISOString().slice(0, 10));

  return (
    <section aria-labelledby="contact-heading">
      <h1 id="contact-heading" className="text-3xl font-semibold text-gray-900">
        {t('pages.contact.heading')}
      </h1>

      <div className="mt-8 flex flex-col gap-12 lg:flex-row">
        {/* Left: info */}
        <div className="flex flex-col gap-8 lg:w-1/2">
          {/* Bio */}
          {cms?.contact.bio && (
            <div>
              <h2 className="mb-2 text-lg font-semibold text-gray-900">{t('pages.contact.bio')}</h2>
              <p className="text-gray-700">{l(cms.contact.bio)}</p>
              {cms.contact.categoriesOverview && <p className="mt-2 text-sm text-gray-600">{l(cms.contact.categoriesOverview)}</p>}
            </div>
          )}

          {/* Markets */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">{t('pages.contact.markets')}</h2>
            {futureMarkets.length === 0 ?
              <p className="text-sm text-gray-500">{t('pages.contact.noMarkets')}</p>
            : <ul className="flex flex-col gap-3">
                {futureMarkets.map((market, i) => {
                  const dateStr = new Intl.DateTimeFormat(t('pages.contact.locale'), { year: 'numeric', month: 'long', day: 'numeric' }).format(
                    new Date(market.date),
                  );
                  return (
                    <li key={i} className="rounded-lg border border-neutral/40 p-3">
                      <p className="text-sm font-semibold text-gray-900">{dateStr}</p>
                      <p className="text-sm text-gray-700">{l(market.location)}</p>
                      {market.description && <p className="mt-1 text-xs text-gray-500">{l(market.description)}</p>}
                      {market.url && (
                        <a href={market.url} target="_blank" rel="noreferrer" className="mt-1 text-xs text-accent hover:underline">
                          {t('pages.contact.marketLink')} →
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            }
          </div>

          {/* Social + email */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">{t('pages.contact.social')}</h2>
            <ul className="flex flex-col gap-1">
              {cms?.settings.artistEmail && (
                <li>
                  <a
                    href={`mailto:${cms.settings.artistEmail}`}
                    className="text-sm text-accent hover:underline"
                    aria-label={t('pages.contact.emailLabel')}
                  >
                    ✉ {cms.settings.artistEmail}
                  </a>
                </li>
              )}
              {cms?.settings.socialLinks.map(link => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.type}
                    className="text-sm capitalize text-gray-700 hover:text-accent hover:underline"
                  >
                    {link.type}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          {(cms?.settings.mapUrl || cms?.settings.address) && (
            <div>
              <h2 className="mb-2 text-lg font-semibold text-gray-900">{t('pages.contact.location')}</h2>
              {cms.settings.address && <p className="text-sm text-gray-700">{l(cms.settings.address)}</p>}
              {cms.settings.mapUrl && (
                <a
                  href={cms.settings.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center text-sm text-accent hover:underline"
                >
                  {t('pages.contact.viewMap')} →
                </a>
              )}
            </div>
          )}
        </div>

        {/* Right: contact form */}
        <div className="lg:w-1/2">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">{t('pages.contact.formTitle')}</h2>
          {success ?
            <div data-testid="contact-success" className="rounded-xl bg-secondary/50 px-6 py-8 text-center">
              <p className="text-lg font-semibold text-gray-900">✅ {t('pages.contact.successTitle')}</p>
              <p className="mt-1 text-sm text-gray-600">{t('pages.contact.successMessage')}</p>
            </div>
          : <form
              className="flex flex-col gap-4"
              data-testid="contact-form"
              onSubmit={e => {
                e.preventDefault();
                form.handleSubmit();
              }}
              noValidate
            >
              <form.Field name="name">
                {field => (
                  <Field
                    label={t('pages.contact.fields.name')}
                    id="contact-name"
                    required
                    error={field.state.meta.errors[0] ? t(`pages.checkout.errors.${field.state.meta.errors[0]}`) : undefined}
                  >
                    <input
                      id="contact-name"
                      type="text"
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      required
                      autoComplete="name"
                      className="rounded-lg border border-neutral/50 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </Field>
                )}
              </form.Field>
              <form.Field name="email">
                {field => (
                  <Field
                    label={t('pages.contact.fields.email')}
                    id="contact-email"
                    required
                    error={field.state.meta.errors[0] ? t(`pages.checkout.errors.${field.state.meta.errors[0]}`) : undefined}
                  >
                    <input
                      id="contact-email"
                      type="email"
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      required
                      autoComplete="email"
                      className="rounded-lg border border-neutral/50 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </Field>
                )}
              </form.Field>
              <form.Field name="message">
                {field => (
                  <Field
                    label={t('pages.contact.fields.message')}
                    id="contact-message"
                    required
                    error={field.state.meta.errors[0] ? t(`pages.checkout.errors.${field.state.meta.errors[0]}`) : undefined}
                  >
                    <textarea
                      id="contact-message"
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      required
                      rows={5}
                      className="rounded-lg border border-neutral/50 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </Field>
                )}
              </form.Field>
              <Button type="submit" variant="primary" className="w-full" disabled={pending}>
                {pending ? t('common.loading') : t('pages.contact.submit')}
              </Button>
            </form>
          }
        </div>
      </div>

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
    </section>
  );
}
