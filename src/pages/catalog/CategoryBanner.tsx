import { Image } from '../../common/Image';
import { getCategoryImageUrl } from '../../utils/image';

export interface CategoryBannerProps {
  categoryId: string;
  alt: string;
}

export function CategoryBanner({ categoryId, alt }: Readonly<CategoryBannerProps>) {
  return (
    <div className="mb-4 overflow-hidden rounded-xl bg-primary/10">
      <Image src={getCategoryImageUrl(categoryId)} alt={alt} className="h-40" />
    </div>
  );
}
