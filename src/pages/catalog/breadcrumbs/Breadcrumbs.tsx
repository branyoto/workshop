import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useCms } from '../../../services/providers/cms/useCms';
import { useBreadcrumbs } from './useBreadcrumbs';

export function Breadcrumbs() {
  const { t } = useTranslation();
  const { categories } = useCms();
  const breadcrumbs = useBreadcrumbs(categories);

  return (
    <div className="mb-4">
      <nav aria-label={t('breadcrumb.label')}>
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          {breadcrumbs.map((crumb, i, { length }) => (
            <li key={crumb.label} className="flex items-center gap-1">
              {i > 0 && (
                <span aria-hidden="true" className="text-gray-400">
                  /
                </span>
              )}
              {crumb.href === undefined || i === length - 1 ?
                <span aria-current="page" className="font-medium text-gray-900">
                  {crumb.label}
                </span>
              : <Link
                  to={crumb.href}
                  className="rounded text-gray-600 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1"
                >
                  {crumb.label}
                </Link>
              }
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
