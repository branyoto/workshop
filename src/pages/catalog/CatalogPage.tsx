import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { EmptyState } from '../../common/EmptyState';
import { getThumbnailUrl } from '../cms/imageUrl';
import { useLocalize } from '../cms/useLocalize';
import type { CategoryView } from '../cms/types';
import { useCms } from '../cms/useCms';
import { ItemCard } from './ItemCard';

function collectTags(category: CategoryView): string[] {
  const tags = new Set(category.tags);
  for (const child of category.children ?? []) {
    for (const tag of collectTags(child)) {
      tags.add(tag);
    }
  }
  return [...tags];
}

type ResolveResult = { category: CategoryView | null; notFound: boolean };

function resolveCategory(
  categories: CategoryView[],
  categoryId: string | undefined,
  subcategoryId: string | undefined,
  subId: string | undefined,
): ResolveResult {
  if (!categoryId) return { category: null, notFound: false };

  const root = categories.find(c => c.id === categoryId);
  if (root === undefined) return { category: null, notFound: true };
  if (subcategoryId === undefined) return { category: root, notFound: false };

  const child = root.children?.find(c => c.id === subcategoryId);
  if (child === undefined) return { category: null, notFound: true };
  if (subId === undefined) return { category: child, notFound: false };

  const grandchild = child.children?.find(c => c.id === subId);
  if (grandchild === undefined) return { category: null, notFound: true };
  return { category: grandchild, notFound: false };
}

interface CategoryBannerProps {
  categoryId: string;
  alt: string;
}

function CategoryBanner({ categoryId, alt }: Readonly<CategoryBannerProps>) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <div className="mb-4 overflow-hidden rounded-xl bg-primary/10">
      <img
        src={getThumbnailUrl(categoryId)}
        alt={alt}
        onError={() => setHidden(true)}
        className="h-40 w-full object-cover"
      />
    </div>
  );
}

export function CatalogPage() {
  const { t } = useTranslation();
  const l = useLocalize();
  const { categoryId, subcategoryId, subId } = useParams();
  const { data: cms } = useCms();

  if (!cms) return null;

  const { category: resolvedCategory, notFound } = resolveCategory(cms.categories, categoryId, subcategoryId, subId);

  if (notFound) {
    return (
      <section aria-labelledby="catalog-heading">
        <h1 id="catalog-heading" className="sr-only">
          {t('pages.catalog.heading')}
        </h1>
        <EmptyState title={t('pages.catalog.notFound.title')} description={t('pages.catalog.notFound.description')} />
      </section>
    );
  }

  const activeTags = resolvedCategory ? collectTags(resolvedCategory) : null;
  const items = activeTags ? cms.items.filter(item => item.tags.some(tag => activeTags.includes(tag))) : cms.items;
  const heading = resolvedCategory ? l(resolvedCategory.name) : t('pages.catalog.heading');
  const description = resolvedCategory?.description != null ? l(resolvedCategory.description) : undefined;

  return (
    <section aria-labelledby="catalog-heading">
      {resolvedCategory && <CategoryBanner categoryId={resolvedCategory.id} alt={heading} />}
      <h1 id="catalog-heading" className="text-3xl font-semibold text-gray-900">
        {heading}
      </h1>
      {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}

      {items.length === 0 ? (
        <div className="mt-8">
          <EmptyState title={t('pages.catalog.emptyTitle')} description={t('pages.catalog.emptyDescription')} />
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map(item => (
            <li key={item.id}>
              <ItemCard item={item} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
