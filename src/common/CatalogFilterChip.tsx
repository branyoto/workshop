import { catalogUrl } from '../routes/routePaths';
import { Link } from 'react-router';

export interface CatalogFilterChipProps {
  label: string;
  value: string;
  filter?: string;
}

export function CatalogFilterChip({ label, value, filter }: Readonly<CatalogFilterChipProps>) {
  return (
    <Link
      to={filter ? `${catalogUrl()}?${filter}=${encodeURIComponent(value)}` : ''}
      className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent hover:bg-accent/20"
    >
      {label}
    </Link>
  );
}
