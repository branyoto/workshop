import { SlidersHorizontal } from 'lucide-react';
import { Button } from '../../../common/Button';
import { Badge } from '../../../common/Badge';
import { useTranslation } from 'react-i18next';
import type { Noop } from '../../../utils/useDisclosure';
import { useFilters } from '../filters/useFilters';

export interface MobileFilterButtonProps {
  onOpen: Noop;
}

export function MobileFilterButton({ onOpen }: Readonly<MobileFilterButtonProps>) {
  const { t } = useTranslation();
  const { activeCount } = useFilters();

  return (
    <div className="mb-4 flex items-center gap-2 lg:hidden">
      <Button variant="text" className="gap-2 border border-bg-200" onClick={onOpen}>
        <SlidersHorizontal aria-hidden="true" className="size-4" strokeWidth={1.75} />
        {t('pages.catalog.filters.openFilters')}
        {activeCount > 0 && (
          <Badge variant="default" className="px-1.5 py-0 text-[10px]">
            {activeCount}
          </Badge>
        )}
      </Button>
    </div>
  );
}
