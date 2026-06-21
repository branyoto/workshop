import { useContext } from 'react';
import { CmsContext } from './CmsContext';
import type { CmsContent } from './types';

export function useCms(): CmsContent {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error('useCms must be used within CmsProvider');
  return ctx;
}
