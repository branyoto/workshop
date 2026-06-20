import { useQuery } from '@tanstack/react-query';

import { fetchCmsContent } from './client';
import type { CmsContent } from './types';

export const cmsQueryKey = ['cms'] as const;

export function useCms() {
  return useQuery<CmsContent, Error>({
    queryKey: cmsQueryKey,
    queryFn: fetchCmsContent,
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
