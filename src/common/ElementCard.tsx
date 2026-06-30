import { Link } from 'react-router';
import type { ReactNode } from 'react';
import { DecorativeImage } from './DecorativeImage';

export interface ElementCardProps {
  href: string;
  imageUrl: string;
  label: ReactNode;
  imageBadge?: ReactNode;
}

export function ElementCard({ href, imageUrl, label, imageBadge }: Readonly<ElementCardProps>) {
  return (
    <Link
      to={href}
      className="group flex flex-col items-center gap-2 rounded-xl border border-bg-200 bg-bg-50 p-3 text-center transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-bg-50">
        <DecorativeImage src={imageUrl} className="transition-transform duration-200 group-hover:scale-105" />
        {imageBadge && <div className="absolute inset-0 flex items-center justify-center bg-bg-50/60">{imageBadge}</div>}
      </div>
      {label}
    </Link>
  );
}
