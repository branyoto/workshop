import { useTranslation } from 'react-i18next';
import { ToggleButton } from '../../../../common/input/ToggleButton';
import { useNavigate } from 'react-router';
import { catalogUrl, categoryUrl } from '../../../../routes/routePaths';
import { FEATURED_ITEMS_CATEGORY_ID } from '../../utils';

export interface FeaturedItemsFilterProps {
  featured: boolean;
}

export function FeaturedItemsFilter({ featured }: Readonly<FeaturedItemsFilterProps>) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <ToggleButton
      label={t('pages.catalog.filters.featured')}
      active={featured}
      onClick={() => navigate(featured ? catalogUrl() : categoryUrl(FEATURED_ITEMS_CATEGORY_ID))}
    />
  );
}
