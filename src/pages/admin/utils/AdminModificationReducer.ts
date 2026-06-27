import type { CategoryView, CmsContent, Item, LocalizedText } from '../../../services/providers/cms/types';
import { notNull } from '../../../utils/commonFilter';
import type { SetStateAction } from 'react';

export interface EditLocalizedText {
  id: string;
  value: LocalizedText;
}
export interface EditImage {
  itemId: string;
  index: number;
  image: string;
}

export type ModificationAction =
  | { type: 'EDIT_CATEGORY'; prevCategoryId: string; category: CategoryView }
  | { type: 'DELETE_CATEGORY'; categoryId: string }
  | { type: 'EDIT_ITEM'; prevItemId: string; item: Item }
  | { type: 'DELETE_ITEM'; itemId: string }
  | { type: 'EDIT_IMAGE'; itemId: string; index: number; image: EditImage }
  | { type: 'DELETE_IMAGE'; itemId: string; index: number }
  | { type: 'EDIT_COLOR'; prevColorKey: string; color: EditLocalizedText }
  | { type: 'DELETE_COLOR'; colorKey: string }
  | { type: 'EDIT_TAG'; prevTagKey: string; tag: EditLocalizedText }
  | { type: 'DELETE_TAG'; tagKey: string }
  | { type: 'ADD_CATEGORY_TO_FEATURED'; categoryId: string }
  | { type: 'REMOVE_CATEGORY_FROM_FEATURED'; categoryId: string }
  | { type: 'ADD_ITEM_TO_FEATURED'; itemId: string }
  | { type: 'REMOVE_ITEM_FROM_FEATURED'; itemId: string }
  | { type: 'HYDRATE'; updater: SetStateAction<CmsContent> }
  | { type: 'COPY' }
  | { type: 'DOWNLOAD' };

function replaceCategory(categories: CategoryView[], categoryId: string, category?: CategoryView): CategoryView[] {
  return categories
    .map(c => (c.id === categoryId ? category : c))
    .filter(notNull)
    .map(category => (category.children ? { ...category, children: replaceCategory(category.children, categoryId, category) } : category));
}

function editCategory(state: CmsContent, prevId: string, category: CategoryView): CmsContent {
  const featuredCategoryIndex = state.featuredCategoryIds.indexOf(prevId);
  const featuredCategoryIds = [...state.featuredCategoryIds];
  if (featuredCategoryIndex !== -1) {
    featuredCategoryIds[featuredCategoryIndex] = category.id;
  }
  return { ...state, categories: replaceCategory(state.categories, prevId, category), featuredCategoryIds };
}

export function adminModificationReducer(state: CmsContent, action: ModificationAction): CmsContent {
  switch (action.type) {
    case 'DELETE_CATEGORY':
      return { ...state, categories: replaceCategory(state.categories, action.categoryId) };
    case 'EDIT_CATEGORY':
      return editCategory(state, action.prevCategoryId, action.category);
    default:
      console.warn('unknown action type', action.type, JSON.stringify(action));
      return state;
  }
}
