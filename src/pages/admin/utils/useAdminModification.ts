import { useContext, useMemo } from 'react';
import { AdminModificationContext } from './AdminModificationContext';

export const useAdminModification = () => {
  const context = useContext(AdminModificationContext);
  if (!context) {
    throw new Error('useAdminModification must be used inside a AdminModificationProvider');
  }
  return useMemo(() => {
    return { ...context };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.value]);
};
