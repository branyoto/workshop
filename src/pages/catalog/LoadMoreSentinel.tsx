import { Button } from '../../common/Button';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export interface LoadMoreSentinelProps {
  hasMore: boolean;
  loadMore: () => void;
}

export function LoadMoreSentinel({ hasMore, loadMore }: Readonly<LoadMoreSentinelProps>) {
  const { t } = useTranslation();
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { threshold: 0.1 },
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  return (
    <div ref={sentinelRef} className="mt-8 flex justify-center">
      {hasMore && (
        <Button variant="secondary" data-testid="load-more-button" onClick={loadMore}>
          {t('pages.catalog.loadMore')}
        </Button>
      )}
    </div>
  );
}
