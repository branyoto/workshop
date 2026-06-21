import { useSearchParams } from 'react-router';
import { useMemo } from 'react';

export interface Filters {
  minPrice: number | null;
  maxPrice: number | null;
  colors: string[];
  tags: string[];
  available: boolean;
}

function patch(prev: URLSearchParams, updater: (next: URLSearchParams) => void): URLSearchParams {
  const next = new URLSearchParams(prev);
  next.delete('page');
  updater(next);
  return next;
}

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: Filters = useMemo(
    () => ({
      minPrice: searchParams.has('minPrice') ? Number(searchParams.get('minPrice')) : null,
      maxPrice: searchParams.has('maxPrice') ? Number(searchParams.get('maxPrice')) : null,
      colors: searchParams.getAll('color'),
      tags: searchParams.getAll('tag'),
      available: searchParams.get('available') === 'true',
    }),
    [searchParams],
  );

  const activeCount = useMemo(
    () =>
      (filters.minPrice == null ? 0 : 1) +
      (filters.maxPrice == null ? 0 : 1) +
      filters.colors.length +
      filters.tags.length +
      (filters.available ? 1 : 0),
    [filters],
  );

  return useMemo(
    () => ({
      filters,
      activeCount,
      setMinPrice: (v: number | null) =>
        setSearchParams(p => patch(p, n => (v === null ? n.delete('minPrice') : n.set('minPrice', String(v)))), { replace: true }),
      setMaxPrice: (v: number | null) =>
        setSearchParams(p => patch(p, n => (v === null ? n.delete('maxPrice') : n.set('maxPrice', String(v)))), { replace: true }),
      setAvailable: (v: boolean) => setSearchParams(p => patch(p, n => (v ? n.set('available', 'true') : n.delete('available')))),
      toggleColor: (color: string) =>
        setSearchParams(p =>
          patch(p, search => {
            const cur = search.getAll('color');
            search.delete('color');
            (cur.includes(color) ? cur.filter(c => c !== color) : [...cur, color]).forEach(t => search.append('color', t));
          }),
        ),
      toggleTag: (tag: string) =>
        setSearchParams(p =>
          patch(p, search => {
            const cur = search.getAll('tag');
            search.delete('tag');
            (cur.includes(tag) ? cur.filter(t => t !== tag) : [...cur, tag]).forEach(t => search.append('tag', t));
          }),
        ),
      clearAll: () => setSearchParams(new URLSearchParams()),
    }),
    [activeCount, filters, setSearchParams],
  );
}
