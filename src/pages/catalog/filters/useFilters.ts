import { useParams, useSearchParams } from 'react-router';
import { useMemo } from 'react';
import { FEATURED_ITEMS_CATEGORY_ID } from '../utils';

export interface Filters {
  minPrice: number | null;
  maxPrice: number | null;
  colors: string[];
  tags: string[];
  featured: boolean;
  available: boolean;
}

function setOrDelete(key: string, newValue: string | number | boolean | null | undefined) {
  return (searchParams: URLSearchParams) => {
    if (newValue === null || !newValue) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, String(newValue));
    }
    return searchParams;
  };
}

function setOrDeleteMultiple(key: string, newValue: string) {
  return (searchParams: URLSearchParams) => {
    const prevValues = searchParams.getAll(key);
    searchParams.delete(key);
    const newValues = prevValues.includes(newValue) ? prevValues.filter(c => c !== newValue) : [...prevValues, newValue];
    newValues.forEach(t => searchParams.append(key, t));
    return searchParams;
  };
}

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categoryId } = useParams();

  const filters: Filters = useMemo(
    () => ({
      minPrice: searchParams.has('minPrice') ? Number(searchParams.get('minPrice')) : null,
      maxPrice: searchParams.has('maxPrice') ? Number(searchParams.get('maxPrice')) : null,
      colors: searchParams.getAll('color'),
      tags: searchParams.getAll('tag'),
      featured: categoryId === FEATURED_ITEMS_CATEGORY_ID,
      available: searchParams.get('available') === 'true',
    }),
    [searchParams, categoryId],
  );

  const activeCount = useMemo(
    () =>
      (filters.minPrice == null ? 0 : 1) +
      (filters.maxPrice == null ? 0 : 1) +
      filters.colors.length +
      filters.tags.length +
      (filters.featured ? 1 : 0) +
      (filters.available ? 1 : 0),
    [filters],
  );

  return useMemo(
    () => ({
      filters,
      activeCount,
      setMinPrice: (newValue: number | null) => setSearchParams(setOrDelete('minPrice', newValue)),
      setMaxPrice: (newValue: number | null) => setSearchParams(setOrDelete('maxPrice', newValue)),
      setAvailable: (newValue: boolean) => setSearchParams(setOrDelete('available', newValue)),
      toggleColor: (color: string) => setSearchParams(setOrDeleteMultiple('color', color)),
      toggleTag: (tag: string) => setSearchParams(setOrDeleteMultiple('tag', tag)),
      clearAll: () => setSearchParams(new URLSearchParams()),
    }),
    [activeCount, filters, setSearchParams],
  );
}
