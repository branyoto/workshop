import { Button } from '../../common/Button';
import { EmptyState } from '../../common/EmptyState';
import { translate } from '../../i18n/translate';

export interface CmsErrorStateProps {
  onRetry: () => void;
  isRetrying?: boolean;
}

export function CmsErrorState({ onRetry, isRetrying = false }: Readonly<CmsErrorStateProps>) {
  return (
    <div className="cms-state cms-state--error flex min-h-svh items-center justify-center bg-white px-4">
      <EmptyState
        title={translate('pages.cms.error.title')}
        description={translate('pages.cms.error.description')}
        action={
          <div className="cms-state__actions">
            <Button onClick={onRetry} disabled={isRetrying}>
              {translate('pages.cms.error.retry')}
            </Button>
          </div>
        }
      />
    </div>
  );
}
