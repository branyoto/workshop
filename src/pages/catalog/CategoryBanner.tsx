import { useState } from 'react';
import { getCategoryImageUrl } from '../../utils/image';

export interface CategoryBannerProps {
  categoryId: string;
  alt: string;
}

export function CategoryBanner({ categoryId, alt }: Readonly<CategoryBannerProps>) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <div className="mb-4 overflow-hidden rounded-xl bg-primary/10">
      <img src={getCategoryImageUrl(categoryId)} alt={alt} onError={() => setHidden(true)} className="h-40 w-full object-cover" />
    </div>
  );
}
