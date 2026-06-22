import { useSearchParams } from 'react-router';
import { useMemo } from 'react';

export interface Filters {
  minPrice: number | null;
  maxPrice: number | null;
  colors: string[];
  tags: string[];
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
