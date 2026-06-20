import { Spinner } from '../../common/Spinner';
import { translate } from '../../i18n/translate';

export function CmsLoadingState() {
  return (
    <div className="cms-state cms-state--loading flex min-h-svh items-center justify-center bg-white px-4">
      <Spinner label={translate('pages.cms.loading')} />
    </div>
  );
}
