import { catalogUrl } from '../routes/routePaths';
import { Link } from 'react-router';

export interface CatalogFilterChipProps {
  label: string;
  value?: string;
  filter?: string;
}

export function CatalogFilterChip({ label, value, filter }: Readonly<CatalogFilterChipProps>) {
  return (
    <Link
      to={filter && value ? `${catalogUrl()}?${filter}=${encodeURIComponent(value)}` : catalogUrl()}
      className="inline-flex items-center rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-medium text-accent-500 hover:bg-accent-100"
    >
      {label}
    </Link>
  );
}
