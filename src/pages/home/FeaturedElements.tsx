import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard, Navigation } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';

export interface Element {
  id: string;
  href: string;
  label: ReactNode;
  imageUrl: string;
}

export interface FeaturedElementsProps {
  titleKey: string;
  titleHref: string;
  elements: Element[];
}

export function FeaturedElements({ titleKey, titleHref, elements }: Readonly<FeaturedElementsProps>) {
  const { t } = useTranslation();

  if (!elements.length) return null;
  return (
    <section aria-labelledby={titleKey}>
      <h2 id={titleKey} className="mb-4 text-xl font-semibold text-gray-900">
        <Link
          to={titleHref}
          className="group inline-flex items-center gap-2 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {t(titleKey)}
          <ArrowRight
            aria-hidden="true"
            className="size-5 -translate-x-1 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
            strokeWidth={1.75}
          />
        </Link>
      </h2>
      <Swiper
        modules={[Navigation, Keyboard, A11y]}
        navigation
        keyboard={{ enabled: true }}
        slidesPerView={2}
        spaceBetween={16}
        breakpoints={{ 640: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
      >
        {elements.map(({ id, label, href, imageUrl }) => (
          <SwiperSlide key={id}>
            <Link
              to={href}
              className="group flex flex-col items-center gap-2 rounded-xl border border-neutral/40 bg-white p-3 text-center transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-primary/10">
                <img
                  src={imageUrl}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              {label}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
