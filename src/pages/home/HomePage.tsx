import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useCart } from '../../cart/useCart';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';
import { getThumbnailUrl } from '../cms/imageUrl';
import { useLocalize } from '../cms/useLocalize';
import { useCms } from '../cms/useCms';
import { catalogUrl, categoryUrl, itemUrl } from '../../routes/routePaths';
import heroImg from '../../assets/hero.png';

export function HomePage() {
  const { t, i18n } = useTranslation();
  const l = useLocalize();
  const { data: cms } = useCms();
  const { addItem, items: cartItems } = useCart();

  const priceLabel = (amount: number) =>
    new Intl.NumberFormat(i18n.language === 'fr' ? 'fr-FR' : 'en-GB', { style: 'currency', currency: 'EUR' }).format(amount);

  const featuredCategories = cms ? cms.featuredCategoryIds.map(id => cms.categories.find(c => c.id === id)).filter(Boolean) : [];
  const featuredItems = cms ? cms.featuredItemIds.map(id => cms.items.find(i => i.id === id)).filter(Boolean) : [];

  // prefers-reduced-motion
  const reducedMotion = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="flex flex-col gap-16">
      {/* Hero */}
      <section aria-labelledby="hero-heading" className="-mx-4 -mt-8 overflow-hidden">
        <div className="relative flex min-h-90 items-center justify-center bg-primary/20">
          <img
            src={heroImg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="relative z-10 flex flex-col items-center gap-4 px-4 py-12 text-center">
            <h1 id="hero-heading" className="text-4xl font-bold text-gray-900">
              {t('pages.home.tagline')}
            </h1>
            <p className="max-w-md text-lg text-gray-700">{t('pages.home.taglineSubtitle')}</p>
            <Link
              to={catalogUrl()}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-accent/90"
            >
              {t('pages.home.cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Category carousel */}
      {featuredCategories.length > 0 && (
        <section aria-labelledby="categories-heading">
          <h2 id="categories-heading" className="mb-4 text-xl font-semibold text-gray-900">
            {t('pages.home.categories')}
          </h2>
          <Swiper
            modules={[Navigation, Keyboard, A11y]}
            navigation
            keyboard={{ enabled: true }}
            slidesPerView={2}
            spaceBetween={16}
            breakpoints={{ 640: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
            autoplay={reducedMotion ? false : undefined}
          >
            {featuredCategories.map(cat => {
              if (!cat) return null;
              const name = l(cat.name);
              return (
                <SwiperSlide key={cat.id}>
                  <Link
                    to={categoryUrl(cat.id)}
                    className="group flex flex-col items-center gap-2 rounded-xl border border-neutral/40 bg-white p-3 text-center transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <div className="aspect-square w-full overflow-hidden rounded-lg bg-primary/10">
                      <img
                        src={getThumbnailUrl(cat.id)}
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{name}</span>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </section>
      )}

      {/* Featured items */}
      {featuredItems.length > 0 && (
        <section aria-labelledby="featured-heading">
          <h2 id="featured-heading" className="mb-4 text-xl font-semibold text-gray-900">
            {t('pages.home.featured')}
          </h2>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featuredItems.map(item => {
              if (!item) return null;
              const title = l(item.title);
              const thumbnailUrl = getThumbnailUrl(item.id);
              const inCart = cartItems.some(ci => ci.id === item.id);
              return (
                <li key={item.id}>
                  <article className="group flex flex-col overflow-hidden rounded-xl border border-neutral/50 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <Link to={itemUrl(item.id)} aria-label={title} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset">
                      <div className="relative aspect-square overflow-hidden bg-primary/10">
                        <img src={thumbnailUrl} alt="" aria-hidden="true" className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105" loading="lazy" />
                        {!item.available && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                            <Badge variant="muted" className="text-xs">{t('pages.catalog.outOfStock')}</Badge>
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="flex flex-1 flex-col gap-2 p-3">
                      <Link to={itemUrl(item.id)} className="text-sm font-medium text-gray-900 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1">
                        {title}
                      </Link>
                      <div className="mt-auto flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold">{priceLabel(item.price)}</span>
                        {item.available && (
                          <Button
                            variant={inCart ? 'ghost' : 'secondary'}
                            className="px-2 py-1 text-xs"
                            disabled={inCart}
                            onClick={() => addItem({ id: item.id, titleSnapshot: title, priceSnapshot: item.price, thumbnailUrl })}
                          >
                            {inCart ? t('pages.catalog.inCart') : t('pages.catalog.addToCart')}
                          </Button>
                        )}
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Artist teaser */}
      {cms?.contact.bio && (
        <section aria-labelledby="artist-heading" className="rounded-xl bg-primary/10 px-6 py-8">
          <h2 id="artist-heading" className="mb-2 text-xl font-semibold text-gray-900">{t('pages.home.artistTeaser')}</h2>
          <p className="max-w-prose text-gray-700">{l(cms.contact.bio).slice(0, 240)}{l(cms.contact.bio).length > 240 ? '…' : ''}</p>
          <Link to="/contact" className="mt-4 inline-flex items-center text-sm font-medium text-accent hover:underline">
            {t('pages.home.learnMore')} →
          </Link>
        </section>
      )}
    </div>
  );
}
