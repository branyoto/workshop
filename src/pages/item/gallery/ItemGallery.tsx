import type { Item } from '../../../services/providers/cms/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import { useLocalize } from '../../../services/providers/cms/useLocalize';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { getProductImageUrl } from '../../../utils/image';

export interface ItemGalleryProps {
  item: Item;
}

export function ItemGallery({ item }: Readonly<ItemGalleryProps>) {
  const l = useLocalize();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const title = l(item.title);
  const images = Array.from({ length: 20 }, (_, i) => getProductImageUrl(item.id, i + 1)).filter(url => !failedImages.has(url));

  return (
    <div className="min-w-0 lg:w-1/2">
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        loop
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        className="mb-2 overflow-hidden rounded-xl"
      >
        {images.map((url, i) => (
          <SwiperSlide key={url}>
            <div className="aspect-square overflow-hidden bg-primary/10">
              <img
                src={url}
                alt={i === 0 ? title : `${title} — ${i + 1}`}
                className="h-full w-full object-cover"
                onError={() => setFailedImages(prev => new Set([...prev, url]))}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {images.length > 1 && (
        <Swiper modules={[Thumbs]} onSwiper={setThumbsSwiper} slidesPerView={6} spaceBetween={8} watchSlidesProgress className="thumbs-swiper">
          {images.map((url, i) => (
            <SwiperSlide key={url}>
              <div className="aspect-square cursor-pointer overflow-hidden rounded-md border border-neutral/40 bg-primary/10">
                <img
                  src={url}
                  alt={title + (i === 0 ? '' : ` — ${i + 1}`) + ' thumbnail'}
                  aria-hidden="true"
                  className="h-full w-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
