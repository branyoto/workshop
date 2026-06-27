import type { CategoryView, CmsContent, Item, LocalizedText } from '../../../services/providers/cms/types';
import { notNull } from '../../../utils/commonFilter';
import type { SetStateAction } from 'react';
import { findCategory } from '../../catalog/utils';

export type ModificationStatus = 'idle' | 'copied' | 'downloaded';

export interface AdminModificationReducerState {
  cms: CmsContent;
  status: ModificationStatus;
  selectedItemId: string;
}

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
  | { type: 'SET_STATUS'; status: ModificationStatus }
  | { type: 'SELECT_ITEM'; itemId: string }
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

function editCategory(cms: CmsContent, prevId: string, category?: CategoryView): CmsContent {
  const featuredCategoryIndex = cms.featuredCategoryIds.indexOf(prevId);
  const featuredCategoryIds = [...cms.featuredCategoryIds];
  if (featuredCategoryIndex !== -1 && !category) {
    featuredCategoryIds.splice(featuredCategoryIndex, 1);
  }
  if (findCategory(cms.categories, prevId) || !category) {
    return { ...cms, categories: replaceCategory(cms.categories, prevId, category), featuredCategoryIds };
  }
  return { ...cms, categories: [...cms.categories, category] };
}

function addCategoryToFeatured(cms: CmsContent, categoryId: string): CmsContent {
  const category = findCategory(cms.categories, categoryId);
  if (!category) {
    console.warn(`Cannot add category with id ${categoryId} to featured. Doesn't exist`);
    return cms;
  }
  return { ...cms, featuredCategoryIds: [...cms.featuredCategoryIds, categoryId].distinct() };
}

function removeCategoryFromFeatured(cms: CmsContent, categoryId: string): CmsContent {
  return { ...cms, featuredCategoryIds: cms.featuredCategoryIds.filter(id => id !== categoryId) };
}

export function adminModificationReducer(state: AdminModificationReducerState, action: ModificationAction): AdminModificationReducerState {
  state.status = 'idle';
  switch (action.type) {
    case 'SET_STATUS':
      return { ...state, status: action.status };
    case 'SELECT_ITEM':
      return { ...state, selectedItemId: action.itemId };
    case 'DELETE_CATEGORY':
      return { ...state, cms: editCategory(state.cms, action.categoryId) };
    case 'EDIT_CATEGORY':
      return { ...state, cms: editCategory(state.cms, action.prevCategoryId, action.category) };
    case 'ADD_CATEGORY_TO_FEATURED':
      return { ...state, cms: addCategoryToFeatured(state.cms, action.categoryId) };
    case 'REMOVE_CATEGORY_FROM_FEATURED':
      return { ...state, cms: removeCategoryFromFeatured(state.cms, action.categoryId) };
    case 'COPY':
      void navigator.clipboard.writeText(JSON.stringify(state.cms, null, 2));
      console.log(state);
      return { ...state, status: 'copied' };
    case 'DOWNLOAD': {
      const blob = new Blob([JSON.stringify(state.cms, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'cms.json';
      link.click();
      URL.revokeObjectURL(url);
      return { ...state, status: 'downloaded' };
    }
    default:
      console.warn('unknown action type', action.type, JSON.stringify(action));
      return state;
  }
}
