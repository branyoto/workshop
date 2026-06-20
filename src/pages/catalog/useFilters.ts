import { useSearchParams } from 'react-router';
import type { Item } from '../cms/types';

export interface Filters {
  minPrice: number | null;
  maxPrice: number | null;
  colors: string[];
  tags: string[];
  available: boolean;
}

export function applyFilters(items: Item[], filters: Filters): Item[] {
  return items.filter(item => {
    if (filters.minPrice !== null && item.price < filters.minPrice) return false;
    if (filters.maxPrice !== null && item.price > filters.maxPrice) return false;
    if (filters.available && !item.available) return false;
    if (filters.colors.length > 0) {
      const color = (item.characteristics?.color ?? '').toLowerCase();
      if (!filters.colors.some(c => color === c.toLowerCase())) return false;
    }
    if (filters.tags.length > 0) {
      if (!filters.tags.some(t => item.tags.includes(t))) return false;
    }
    return true;
  });
}

function patch(
  prev: URLSearchParams,
  updater: (next: URLSearchParams) => void,
): URLSearchParams {
  const next = new URLSearchParams(prev);
  next.delete('page');
  updater(next);
  return next;
}

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: Filters = {
    minPrice: searchParams.has('minPrice') ? Number(searchParams.get('minPrice')) : null,
    maxPrice: searchParams.has('maxPrice') ? Number(searchParams.get('maxPrice')) : null,
    colors: searchParams.getAll('color'),
    tags: searchParams.getAll('tag'),
    available: searchParams.get('available') === 'true',
  };

  const activeCount =
    (filters.minPrice !== null ? 1 : 0) +
    (filters.maxPrice !== null ? 1 : 0) +
    filters.colors.length +
    filters.tags.length +
    (filters.available ? 1 : 0);

  return {
    filters,
    activeCount,

    setMinPrice: (v: number | null) =>
      setSearchParams(p => patch(p, n => (v === null ? n.delete('minPrice') : n.set('minPrice', String(v)))), {
        replace: true,
      }),

    setMaxPrice: (v: number | null) =>
      setSearchParams(p => patch(p, n => (v === null ? n.delete('maxPrice') : n.set('maxPrice', String(v)))), {
        replace: true,
      }),

    setAvailable: (v: boolean) =>
      setSearchParams(p => patch(p, n => (v ? n.set('available', 'true') : n.delete('available')))),

    toggleColor: (color: string) =>
      setSearchParams(p =>
        patch(p, n => {
          const cur = n.getAll('color');
          n.delete('color');
          (cur.includes(color) ? cur.filter(c => c !== color) : [...cur, color]).forEach(c => n.append('color', c));
        }),
      ),

    toggleTag: (tag: string) =>
      setSearchParams(p =>
        patch(p, n => {
          const cur = n.getAll('tag');
          n.delete('tag');
          (cur.includes(tag) ? cur.filter(t => t !== tag) : [...cur, tag]).forEach(t => n.append('tag', t));
        }),
      ),

    clearAll: () => setSearchParams(new URLSearchParams()),
  };
}

