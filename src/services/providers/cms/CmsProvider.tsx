import { useQuery } from '@tanstack/react-query';
import type { CmsContent } from './types';
import type { PropsWithChildren } from 'react';
import { CmsContext } from './CmsContext';
import { CmsLoadingState } from './CmsLoadingState';
import { CmsErrorState } from './CmsErrorState';
import { fetchCmsContent, fetchCmsContentQueryKey } from '../../query/cmsQueries';

export function CmsProvider({ children }: Readonly<PropsWithChildren>) {
  const { isLoading, isError, data, isFetching, refetch } = useQuery<CmsContent, Error>({
    queryKey: fetchCmsContentQueryKey,
    queryFn: fetchCmsContent,
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (isLoading) {
    return <CmsLoadingState />;
  }

  if (isError || !data) {
    return <CmsErrorState onRetry={() => void refetch()} isRetrying={isFetching} />;
  }

  return <CmsContext.Provider value={data}>{children}</CmsContext.Provider>;
}
