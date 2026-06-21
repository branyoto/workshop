import { useTranslation } from 'react-i18next';
import { Button } from '../../../common/Button';
import { EmptyState } from '../../../common/EmptyState';

export interface CmsErrorStateProps {
  onRetry: () => void;
  isRetrying?: boolean;
}

export function CmsErrorState({ onRetry, isRetrying = false }: Readonly<CmsErrorStateProps>) {
  const { t } = useTranslation();
  return (
    <div className="cms-state cms-state--error flex min-h-svh items-center justify-center bg-white px-4">
      <EmptyState
        title={t('pages.cms.error.title')}
        description={t('pages.cms.error.description')}
        action={
          <div className="cms-state__actions">
            <Button onClick={onRetry} disabled={isRetrying}>
              {t('pages.cms.error.retry')}
            </Button>
          </div>
        }
      />
    </div>
  );
}
