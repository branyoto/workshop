import { useTranslation } from 'react-i18next';
import { ToggleButton } from '../../../../common/input/ToggleButton';
import { useParams } from 'react-router';
import { useFilters } from '../useFilters';

export function FeaturedItemsFilter() {
  const { t } = useTranslation();
  const { filters, setFeatured } = useFilters();
  const { categoryId, subcategoryId, subId } = useParams();

  if (categoryId || subcategoryId || subId) return null;

  return <ToggleButton label={t('pages.catalog.filters.featured')} active={filters.featured} onClick={() => setFeatured(!filters.featured)} />;
}
