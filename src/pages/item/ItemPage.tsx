import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useCart } from '../../cart/CartContext';
import { Badge } from '../../common/Badge';
import { Button } from '../../common/Button';
import { EmptyState } from '../../common/EmptyState';
import { getItemImageUrl, getThumbnailUrl } from '../cms/imageUrl';
import { useLocalize } from '../cms/useLocalize';
import type { CharacteristicKey } from '../cms/types';
import { useCms } from '../cms/useCms';
import { categoryUrl } from '../../routes/routePaths';

const MAX_GALLERY_IMAGES = 5;

function useGalleryImages(itemId: string): string[] {
  // Try up to MAX_GALLERY_IMAGES; caller removes failed ones
  return Array.from({ length: MAX_GALLERY_IMAGES }, (_, i) => getItemImageUrl(itemId, i + 1));
}

const CHARACTERISTIC_KEYS: CharacteristicKey[] = ['dimension', 'color', 'weight', 'material'];

export function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const l = useLocalize();
  const { data: cms } = useCms();
  const { addItem, items: cartItems } = useCart();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  if (!cms) return null;

  const item = cms.items.find(i => i.id === id);

  if (!item) {
    return (
      <section aria-labelledby="item-heading">
        <h1 id="item-heading" className="sr-only">{t('pages.item.notFound.title')}</h1>
        <EmptyState title={t('pages.item.notFound.title')} description={t('pages.item.notFound.description')} />
      </section>
    );
  }

  const title = l(item.title);
  const description = item.description ? l(item.description) : undefined;
  const thumbnailUrl = getThumbnailUrl(item.id);
  const galleryUrls = useGalleryImages(item.id).filter(url => !failedImages.has(url));
  // Fallback to thumbnail if all gallery images fail
  const displayImages = galleryUrls.length > 0 ? galleryUrls : [thumbnailUrl];

  const priceLabel = new Intl.NumberFormat(i18n.language === 'fr' ? 'fr-FR' : 'en-GB', {
    style: 'currency',
    currency: 'EUR',
  }).format(item.price);

  const inCart = cartItems.some(ci => ci.id === item.id);

  const handleAddToCart = () => {
    addItem({ id: item.id, titleSnapshot: title, priceSnapshot: item.price, thumbnailUrl });
  };

  // Find category IDs that match item tags
  const categoryChips = cms.categories.flatMap(cat => {
    const matches: Array<{ id: string; name: string; tag: string }> = [];
    if (item.tags.some(tag => cat.tags.includes(tag))) {
      matches.push({ id: cat.id, name: l(cat.name), tag: cat.tags[0] ?? '' });
    }
    for (const child of cat.children ?? []) {
      if (item.tags.some(tag => child.tags.includes(tag))) {
        matches.push({ id: child.id, name: l(child.name), tag: child.tags[0] ?? '' });
      }
    }
    return matches;
  });

  const otherTags = item.tags.filter(tag => !categoryChips.some(c => c.tag === tag));

  return (
    <section aria-labelledby="item-heading">
      <h1 id="item-heading" className="sr-only">{title}</h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Gallery */}
        <div className="min-w-0 lg:w-1/2">
          <Swiper
            modules={[Navigation, Thumbs]}
            navigation
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            className="mb-2 overflow-hidden rounded-xl"
          >
            {displayImages.map((url, idx) => (
              <SwiperSlide key={url}>
                <div className="aspect-square overflow-hidden bg-primary/10">
                  <img
                    src={url}
                    alt={idx === 0 ? title : `${title} — ${idx + 1}`}
                    className="h-full w-full object-cover"
                    onError={() => setFailedImages(prev => new Set([...prev, url]))}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {displayImages.length > 1 && (
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              slidesPerView={4}
              spaceBetween={8}
              watchSlidesProgress
              className="thumbs-swiper"
            >
              {displayImages.map((url, idx) => (
                <SwiperSlide key={url}>
                  <div className="aspect-square cursor-pointer overflow-hidden rounded-md border border-neutral/40 bg-primary/10">
                    <img src={url} alt="" aria-hidden="true" className="h-full w-full object-cover" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4 lg:w-1/2">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">{priceLabel}</span>
              <Badge variant={item.available ? 'success' : 'muted'}>
                {item.available ? t('pages.catalog.inStock') : t('pages.catalog.outOfStock')}
              </Badge>
            </div>
          </div>

          {description && <p className="text-sm text-gray-700">{description}</p>}

          {/* Characteristics */}
          {item.characteristics && Object.keys(item.characteristics).length > 0 && (
            <div className="rounded-xl border border-neutral/40 p-4">
              <h3 className="mb-2 text-sm font-semibold text-gray-900">{t('pages.item.characteristics')}</h3>
              <dl className="grid grid-cols-2 gap-2 text-sm">
                {CHARACTERISTIC_KEYS.map(key => {
                  const val = item.characteristics?.[key];
                  if (!val) return null;
                  return (
                    <>
                      <dt key={`dt-${key}`} className="text-gray-500">{t(`pages.item.char.${key}`)}</dt>
                      <dd key={`dd-${key}`} className="font-medium text-gray-900">{val}</dd>
                    </>
                  );
                })}
              </dl>
            </div>
          )}

          {/* Tags */}
          {(categoryChips.length > 0 || otherTags.length > 0) && (
            <div className="flex flex-wrap gap-2">
              {categoryChips.map(c => (
                <Link
                  key={c.id}
                  to={`${categoryUrl(c.id)}?tag=${encodeURIComponent(c.tag)}`}
                  className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent hover:bg-accent/20"
                >
                  {c.name}
                </Link>
              ))}
              {otherTags.map(tag => (
                <span key={tag} className="inline-flex items-center rounded-full border border-neutral/40 bg-neutral/20 px-3 py-1 text-xs text-gray-600">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Add to cart */}
          <div className="mt-auto">
            {item.available ? (
              <Button
                variant="primary"
                className="w-full"
                onClick={handleAddToCart}
                disabled={inCart}
                aria-label={inCart ? t('pages.catalog.inCart') : t('pages.catalog.addToCart')}
              >
                {inCart ? t('pages.catalog.inCart') : t('pages.catalog.addToCart')}
              </Button>
            ) : (
              <div className="rounded-xl border border-neutral/40 p-3 text-center text-sm text-gray-500">
                {t('pages.item.soldOut')}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
