import type { ReactNode } from 'react';

import { CmsErrorState } from './CmsErrorState';
import { CmsLoadingState } from './CmsLoadingState';
import { useCms } from './useCms';

export interface CmsGateProps {
  children: ReactNode;
}

export function CmsGate({ children }: Readonly<CmsGateProps>) {
  const { data, isLoading, isError, refetch, isFetching } = useCms();

  if (isLoading) {
    return <CmsLoadingState />;
  }

  if (isError || !data) {
    return <CmsErrorState onRetry={() => void refetch()} isRetrying={isFetching} />;
  }

  return children;
}
