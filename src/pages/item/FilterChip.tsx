import { categoryUrl } from '../../routes/routePaths';
import { Link } from 'react-router';

export interface FilterChipProps {
  label: string;
  category?: string;
  value: string;
  filter: string;
}

export function FilterChip({ label, category, value, filter }: Readonly<FilterChipProps>) {
  return (
    <Link
      to={`${categoryUrl(category)}?${filter}=${encodeURIComponent(value)}`}
      className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent hover:bg-accent/20"
    >
      {label}
    </Link>
  );
}
