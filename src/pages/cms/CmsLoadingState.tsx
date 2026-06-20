import { useTranslation } from 'react-i18next';
import { Spinner } from '../../common/Spinner';

export function CmsLoadingState() {
  const { t } = useTranslation();
  return (
    <div className="cms-state cms-state--loading flex min-h-svh items-center justify-center bg-white px-4">
      <Spinner label={t('pages.cms.loading')} />
    </div>
  );
}
