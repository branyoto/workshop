import { useContext } from 'react';
import { AdminModificationContext } from './AdminModificationContext';

export const useAdminModification = () => {
  const context = useContext(AdminModificationContext);
  if (!context) {
    throw new Error('useAdminModification must be used inside a AdminModificationProvider');
  }
  return context;
};
