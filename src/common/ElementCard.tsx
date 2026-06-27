import { Link } from 'react-router';
import type { ReactNode } from 'react';

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
      className="group flex flex-col items-center gap-2 rounded-xl border border-neutral/40 bg-white p-3 text-center transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-primary/10">
        <img
          src={imageUrl}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
        />
        {imageBadge && <div className="absolute inset-0 flex items-center justify-center bg-white/60">{imageBadge}</div>}
      </div>
      {label}
    </Link>
  );
}
