import type { Item } from '../../../services/providers/cms/types';
import type { Filters } from './useFilters';

export function applyFilters(items: Item[], filters: Filters): Item[] {
  return items.filter(item => {
    if (filters.minPrice !== null && item.price < filters.minPrice) return false;
    if (filters.maxPrice !== null && item.price > filters.maxPrice) return false;
    if (filters.available && !item.available) return false;
    if (filters.colors.length > 0) {
      if (!filters.colors.some(t => item.characteristics?.colors?.includes(t))) return false;
    }
    if (filters.tags.length > 0) {
      if (!filters.tags.some(t => item.tags.includes(t))) return false;
    }
    return true;
  });
}
