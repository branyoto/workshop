import { useSearchParams } from 'react-router';
import { useMemo } from 'react';

export interface Filters {
  minPrice: number | null;
  maxPrice: number | null;
  colors: string[];
  tags: string[];
  featured: boolean;
  available: boolean;
}

export function setOrDelete(key: keyof Filters, newValue: string | number | boolean | null | undefined) {
  return (searchParams: URLSearchParams) => {
    if (newValue === null || !newValue) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, String(newValue));
    }
    return searchParams;
  };
}

export function setOrDeleteArray(key: keyof Filters, newValue: string) {
  return (searchParams: URLSearchParams) => {
    const prevValues = searchParams.getAll(key);
    searchParams.delete(key);
    const newValues = prevValues.includes(newValue) ? prevValues.filter(c => c !== newValue) : [...prevValues, newValue];
    newValues.forEach(t => searchParams.append(key, t));
    return searchParams;
  };
}

export function setOrDeleteMultiple(key: keyof Filters, values: string[]) {
  return (searchParams: URLSearchParams) => {
    for (const value of values) {
      searchParams = setOrDeleteArray(key, value)(searchParams);
    }
    return searchParams;
  };
}

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: Filters = useMemo(
    () => ({
      minPrice: searchParams.has('minPrice') ? Number(searchParams.get('minPrice')) : null,
      maxPrice: searchParams.has('maxPrice') ? Number(searchParams.get('maxPrice')) : null,
      colors: searchParams.getAll('colors'),
      tags: searchParams.getAll('tags'),
      featured: searchParams.get('featured') === 'true',
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
      setFeatured: (newValue: boolean) => setSearchParams(setOrDelete('featured', newValue)),
      toggleColor: (color: string) => setSearchParams(setOrDeleteArray('colors', color)),
      setTags: (tags: string[]) => setSearchParams(setOrDeleteMultiple('tags', tags)),
      toggleTag: (tag: string) => setSearchParams(setOrDeleteArray('tags', tag)),
      clearAll: () => setSearchParams(new URLSearchParams()),
    }),
    [activeCount, filters, setSearchParams],
  );
}
