import { createContext, type SetStateAction } from 'react';
import type { CategoryView, CmsContent, Item } from '../../../services/providers/cms/types';
import type { Noop } from '../../../utils/useDisclosure';
import type { AdminModificationReducerState, EditImage, EditLocalizedText, ModificationStatus, EditStateAction } from './AdminModificationReducer';

export interface AdminModificationContextValue extends AdminModificationReducerState {
  setStatus: (status: ModificationStatus) => void;
  selectItem: (itemId: string) => void;
  editCategory: (prevCategoryId: string, category: CategoryView) => void;
  deleteCategory: (categoryId: string) => void;
  editSelectedItem: (action: EditStateAction<Item>) => void;
  editItem: (prevItemId: string, updater: SetStateAction<Item>) => void;
  deleteItem: (itemId: string) => void;
  editItemImage: (itemId: string, index: number, image: EditImage) => void;
  deleteItemImage: (itemId: string, index: number) => void;
  editColor: (prevColorKey: string, color: EditLocalizedText) => void;
  deleteColor: (colorKey: string) => void;
  editTag: (prevTagKey: string, tag: EditLocalizedText) => void;
  deleteTag: (tagKey: string) => void;
  addCategoryToFeatured: (categoryId: string) => void;
  removeCategoryFromFeatured: (categoryId: string) => void;
  addItemToFeatured: (itemId: string) => void;
  removeItemFromFeatured: (itemId: string) => void;
  hydrate: (cmsContent: SetStateAction<CmsContent>) => void;
  copy: Noop;
  download: Noop;
  reset: Noop;
}

export const AdminModificationContext = createContext<AdminModificationContextValue | undefined>(undefined);
