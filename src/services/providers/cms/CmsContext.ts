import { createContext } from 'react';
import type { CmsContent } from './types';

export const CmsContext = createContext<CmsContent | undefined>(undefined);
