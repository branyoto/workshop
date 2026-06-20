import { useFilters } from './useFilters';
import { TagFilter } from './filter/TagFilter';
import { ColorFilter } from './filter/ColorFilter';
import { PriceFilter } from './filter/PriceFilter';
import { AvailabilityFilter } from './filter/AvailabilityFilter';
import { ClearButton } from './ClearButton';

export interface FiltersListProps {
  colors: string[];
  tags: string[];
}

export function FiltersList({ colors, tags }: Readonly<FiltersListProps>) {
  const { filters } = useFilters();

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
