import { type PropsWithChildren, type SetStateAction, useCallback, useMemo, useReducer, useState } from 'react';
import { adminModificationReducer, type EditImage, type EditLocalizedText } from './AdminModificationReducer';
import { useCms } from '../../../services/providers/cms/useCms';
import { AdminModificationContext, type AdminModificationContextValue, type ModificationState } from './AdminModificationContext';
import type { CategoryView, CmsContent, Item } from '../../../services/providers/cms/types';

export function AdminModificationProvider({ children }: Readonly<PropsWithChildren>) {
  const cms = useCms();
  const [state, setState] = useState<ModificationState>('idle');
  const [selectedItemId, setSelectedItemId] = useState<string>(cms.items[0]?.id ?? '');
  const [value, dispatch] = useReducer(adminModificationReducer, cms);

  const editCategory = useCallback(
    (prevCategoryId: string, category: CategoryView) => dispatch({ type: 'EDIT_CATEGORY', prevCategoryId, category }),
    [dispatch],
  );
  const deleteCategory = useCallback((categoryId: string) => dispatch({ type: 'DELETE_CATEGORY', categoryId }), [dispatch]);
  const editItem = useCallback((prevItemId: string, item: Item) => dispatch({ type: 'EDIT_ITEM', prevItemId, item }), [dispatch]);
  const deleteItem = useCallback((itemId: string) => dispatch({ type: 'DELETE_ITEM', itemId }), [dispatch]);
  const editItemImage = useCallback(
    (itemId: string, index: number, image: EditImage) => dispatch({ type: 'EDIT_IMAGE', itemId, index, image }),
    [dispatch],
  );
  const deleteItemImage = useCallback((itemId: string, index: number) => dispatch({ type: 'DELETE_IMAGE', itemId, index }), [dispatch]);
  const editColor = useCallback(
    (prevColorKey: string, color: EditLocalizedText) => dispatch({ type: 'EDIT_COLOR', color, prevColorKey }),
    [dispatch],
  );
  const deleteColor = useCallback((colorKey: string) => dispatch({ type: 'DELETE_COLOR', colorKey }), [dispatch]);
  const editTag = useCallback((prevTagKey: string, tag: EditLocalizedText) => dispatch({ type: 'EDIT_TAG', prevTagKey, tag }), [dispatch]);
  const deleteTag = useCallback((tagKey: string) => dispatch({ type: 'DELETE_TAG', tagKey }), [dispatch]);
  const addCategoryToFeatured = useCallback((categoryId: string) => dispatch({ type: 'ADD_CATEGORY_TO_FEATURED', categoryId }), [dispatch]);
  const removeCategoryFromFeatured = useCallback((categoryId: string) => dispatch({ type: 'REMOVE_CATEGORY_FROM_FEATURED', categoryId }), [dispatch]);
  const addItemToFeatured = useCallback((itemId: string) => dispatch({ type: 'ADD_ITEM_TO_FEATURED', itemId }), [dispatch]);
  const removeItemFromFeatured = useCallback((itemId: string) => dispatch({ type: 'REMOVE_ITEM_FROM_FEATURED', itemId }), [dispatch]);
  const hydrate = useCallback((updater: SetStateAction<CmsContent>) => dispatch({ type: 'HYDRATE', updater }), [dispatch]);
  const copy = useCallback(() => dispatch({ type: 'COPY' }), [dispatch]);
  const download = useCallback(() => dispatch({ type: 'DOWNLOAD' }), [dispatch]);
  const reset = useCallback(() => dispatch({ type: 'HYDRATE', updater: cms }), [dispatch, cms]);

  const cmsValues = useMemo(
    (): AdminModificationContextValue => ({
      state,
      setState,
      selectedItemId,
      setSelectedItemId,
      value,
      editCategory,
      deleteCategory,
      editItem,
      deleteItem,
      editItemImage,
      deleteItemImage,
      editColor,
      deleteColor,
      editTag,
      deleteTag,
      addCategoryToFeatured,
      removeCategoryFromFeatured,
      addItemToFeatured,
      removeItemFromFeatured,
      hydrate,
      copy,
      download,
      reset,
    }),
    [
      value,
      state,
      selectedItemId,
      editCategory,
      deleteCategory,
      editItem,
      deleteItem,
      editItemImage,
      deleteItemImage,
      editColor,
      deleteColor,
      editTag,
      deleteTag,
      addCategoryToFeatured,
      removeCategoryFromFeatured,
      addItemToFeatured,
      removeItemFromFeatured,
      hydrate,
      copy,
      download,
      reset,
    ],
  );

  return <AdminModificationContext.Provider value={cmsValues}>{children}</AdminModificationContext.Provider>;
}
