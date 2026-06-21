import { useFilters } from './useFilters';
import { TagFilter } from './filter/TagFilter';
import { ColorFilter } from './filter/ColorFilter';
import { PriceFilter } from './filter/PriceFilter';
import { AvailabilityFilter } from './filter/AvailabilityFilter';
import { ClearButton } from './ClearButton';
import type { Item } from '../../../services/providers/cms/types';
import { uniqueColors, uniqueTags } from '../utils';

export interface FiltersListProps {
  items: Item[];
}

export function FiltersList({ items }: Readonly<FiltersListProps>) {
  const { filters } = useFilters();

  const colors = uniqueColors(items);
  const tags = uniqueTags(items);

  return (
    <div className="space-y-5">
      <ClearButton />
      <div className="h-px bg-neutral/40" />
      <PriceFilter key={`${filters.minPrice}-${filters.maxPrice}`} />
      <AvailabilityFilter />
      <ColorFilter colors={colors} />
      <TagFilter tags={tags} />
    </div>
  );
}
