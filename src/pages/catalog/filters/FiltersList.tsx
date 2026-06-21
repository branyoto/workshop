import { useFilters } from './useFilters';
import { TagFilter } from './filter/TagFilter';
import { ColorFilter } from './filter/ColorFilter';
import { PriceFilter } from './filter/PriceFilter';
import { AvailabilityFilter } from './filter/AvailabilityFilter';
import { ClearButton } from './ClearButton';
import type { Item } from '../../../services/providers/cms/types';
import { uniqueColors, uniqueTags } from '../utils';
import { useLocalize } from '../../../services/providers/cms/useLocalize';

export interface FiltersListProps {
  items: Item[];
}

export function FiltersList({ items }: Readonly<FiltersListProps>) {
  const { filters } = useFilters();
  const l = useLocalize();

  const colors = uniqueColors(items, l);
  const tags = uniqueTags(items);

  return (
    <div className="space-y-5">
      <PriceFilter key={`${filters.minPrice}-${filters.maxPrice}`} />
      <AvailabilityFilter />
      <ColorFilter colors={colors} />
      <TagFilter tags={tags} />
      <ClearButton />
    </div>
  );
}
