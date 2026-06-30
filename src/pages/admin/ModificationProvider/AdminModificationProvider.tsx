import { type PropsWithChildren, type SetStateAction, useCallback, useMemo, useReducer } from 'react';
import {
  adminModificationReducer,
  type EditImage,
  type EditLocalizedText,
  type EditStateAction,
  type ModificationStatus,
} from './AdminModificationReducer';
import { useCms } from '../../../services/providers/cms/useCms';
import { AdminModificationContext, type AdminModificationContextValue } from './AdminModificationContext';
import type { CategoryView, CmsContent, Item } from '../../../services/providers/cms/types';

export function AdminModificationProvider({ children }: Readonly<PropsWithChildren>) {
  const cms = useCms();
  const [value, dispatch] = useReducer(adminModificationReducer, { cms, status: 'idle', selectedItemId: cms.items[0]?.id });

  const setStatus = useCallback((status: ModificationStatus) => dispatch({ type: 'SET_STATUS', status }), []);
  const selectItem = useCallback((itemId: string) => dispatch({ type: 'SELECT_ITEM', itemId }), []);
  const editCategory = useCallback(
    (prevCategoryId: string, category: CategoryView) => dispatch({ type: 'EDIT_CATEGORY', prevCategoryId, category }),
    [dispatch],
  );
  const deleteCategory = useCallback((categoryId: string) => dispatch({ type: 'DELETE_CATEGORY', categoryId }), [dispatch]);
  const saveCategory = useCallback(
    (prevId: string, data: Omit<CategoryView, 'children'>, parentId: string | undefined) =>
      dispatch({ type: 'SAVE_CATEGORY', prevId, data, parentId }),
    [dispatch],
  );
  const editItem = useCallback(
    (prevItemId: string, updater: SetStateAction<Item>) => dispatch({ type: 'EDIT_ITEM', prevItemId, updater }),
    [dispatch],
  );
  const editSelectedItem = useCallback((action: EditStateAction<Item>) => dispatch({ type: 'EDIT_SELECTED_ITEM', action }), [dispatch]);
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
  const moveCategoryInFeatured = useCallback(
    (categoryId: string, direction: 'up' | 'down') => dispatch({ type: 'MOVE_CATEGORY_IN_FEATURED', categoryId, direction }),
    [dispatch],
  );
  const addItemToFeatured = useCallback((itemId: string) => dispatch({ type: 'ADD_ITEM_TO_FEATURED', itemId }), [dispatch]);
  const removeItemFromFeatured = useCallback((itemId: string) => dispatch({ type: 'REMOVE_ITEM_FROM_FEATURED', itemId }), [dispatch]);
  const moveItemInFeatured = useCallback(
    (itemId: string, direction: 'up' | 'down') => dispatch({ type: 'MOVE_ITEM_IN_FEATURED', itemId, direction }),
    [dispatch],
  );
  const hydrate = useCallback((updater: SetStateAction<CmsContent>) => dispatch({ type: 'HYDRATE', updater }), [dispatch]);
  const copy = useCallback(() => dispatch({ type: 'COPY' }), [dispatch]);
  const download = useCallback(() => dispatch({ type: 'DOWNLOAD' }), [dispatch]);
  const reset = useCallback(() => dispatch({ type: 'HYDRATE', updater: cms }), [dispatch, cms]);

  const cmsValues = useMemo(
    (): AdminModificationContextValue => ({
      ...value,
      setStatus,
      selectItem,
      editCategory,
      deleteCategory,
      saveCategory,
      editItem,
      editSelectedItem,
      deleteItem,
      editItemImage,
      deleteItemImage,
      editColor,
      deleteColor,
      editTag,
      deleteTag,
      addCategoryToFeatured,
      removeCategoryFromFeatured,
      moveCategoryInFeatured,
      addItemToFeatured,
      removeItemFromFeatured,
      moveItemInFeatured,
      hydrate,
      copy,
      download,
      reset,
    }),
    [
      value,
      setStatus,
      selectItem,
      editCategory,
      deleteCategory,
      saveCategory,
      editItem,
      editSelectedItem,
      deleteItem,
      editItemImage,
      deleteItemImage,
      editColor,
      deleteColor,
      editTag,
      deleteTag,
      addCategoryToFeatured,
      removeCategoryFromFeatured,
      moveCategoryInFeatured,
      addItemToFeatured,
      removeItemFromFeatured,
      moveItemInFeatured,
      hydrate,
      copy,
      download,
      reset,
    ],
  );

  return <AdminModificationContext.Provider value={cmsValues}>{children}</AdminModificationContext.Provider>;
}
