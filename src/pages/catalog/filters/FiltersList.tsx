import { useFilters } from './useFilters';
import { TagFilter } from './filter/TagFilter';
import { ColorFilter } from './filter/ColorFilter';
import { PriceFilter } from './filter/PriceFilter';
import { AvailabilityFilter } from './filter/AvailabilityFilter';
import { ClearButton } from './ClearButton';
import type { Item } from '../../../services/providers/cms/types';
import { FeaturedItemsFilter } from './filter/FeaturedItemsFilter';

export interface FiltersListProps {
  items: Item[];
}

export function FiltersList({ items }: Readonly<FiltersListProps>) {
  const { filters } = useFilters();

  return (
    <div className="space-y-5">
      <FeaturedItemsFilter featured={filters.featured} />
      <PriceFilter key={`${filters.minPrice}-${filters.maxPrice}`} />
      <AvailabilityFilter />
      <ColorFilter items={items} />
      <TagFilter items={items} />
      <ClearButton />
    </div>
  );
}
