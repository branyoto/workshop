import type { CategoryView, CmsContent, Item, LocalizedText } from '../../../services/providers/cms/types';
import { notNull } from '../../../utils/commonFilter';
import type { SetStateAction } from 'react';
import { findCategory } from '../../catalog/utils';
import type { DeepPartial } from '../../../utils/DeepPartial';

export type ModificationStatus = 'idle' | 'copied' | 'downloaded';

export type EditStateAction<T> = DeepPartial<T> | ((item: T) => DeepPartial<T>);

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
  | { type: 'EDIT_ITEM'; prevItemId: string; updater: SetStateAction<Item> }
  | { type: 'EDIT_SELECTED_ITEM'; action: EditStateAction<Item> }
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

function editLocalizedRecord(records: Record<string, LocalizedText>, prevKey: string, text?: EditLocalizedText): Record<string, LocalizedText> {
  const nextRecords = { ...records };
  delete nextRecords[prevKey];
  if (text) {
    nextRecords[text.id] = text.value;
  }
  return nextRecords;
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

function mergeItem(item: Item, action: EditStateAction<Item>): Item {
  const newItem: DeepPartial<Item> = typeof action === 'function' ? action(item) : action;
  const description = { fr: newItem.description?.fr ?? item.description?.fr, en: newItem.description?.en ?? item.description?.en };
  return {
    id: newItem.id ?? item.id,
    available: newItem.available ?? item.available,
    price: newItem.price ?? item.price,
    title: { fr: newItem.title?.fr ?? item.title.fr, en: newItem.title?.en ?? item.title.en },
    description: description.fr ? { fr: description.fr, en: description.en } : undefined,
    tags: (newItem.tags as string[] | undefined) ?? item.tags,
    characteristics: {
      dimension: newItem.characteristics?.dimension ?? item.characteristics?.dimension,
      weight: newItem.characteristics?.weight ?? item.characteristics?.weight,
      material: newItem.characteristics?.material ?? item.characteristics?.material,
      colors: (newItem.characteristics?.colors as string[] | undefined) ?? item.characteristics?.colors,
    },
  };
}

function editSelectedItem(state: AdminModificationReducerState, action: EditStateAction<Item>): AdminModificationReducerState {
  const items: Item[] = [];
  const featuredItemIndex = state.cms.featuredItemIds.indexOf(state.selectedItemId);
  let selectedItemId = state.selectedItemId;
  for (let item of state.cms.items) {
    if (item.id === state.selectedItemId) {
      item = mergeItem(item, action);
      selectedItemId = item.id;
    }
    items.push(item);
  }
  const featuredItemIds =
    featuredItemIndex >= 0 ? state.cms.featuredItemIds.map((id, i) => (i === featuredItemIndex ? selectedItemId : id)) : state.cms.featuredItemIds;
  return { ...state, selectedItemId, cms: { ...state.cms, items, featuredItemIds } };
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
    case 'DELETE_COLOR':
      return { ...state, cms: { ...state.cms, colors: editLocalizedRecord(state.cms.colors, action.colorKey) } };
    case 'EDIT_COLOR':
      return { ...state, cms: { ...state.cms, colors: editLocalizedRecord(state.cms.colors, action.prevColorKey, action.color) } };
    case 'DELETE_TAG':
      return { ...state, cms: { ...state.cms, tags: editLocalizedRecord(state.cms.tags, action.tagKey) } };
    case 'EDIT_TAG':
      return { ...state, cms: { ...state.cms, tags: editLocalizedRecord(state.cms.tags, action.prevTagKey, action.tag) } };
    case 'EDIT_SELECTED_ITEM':
      return editSelectedItem(state, action.action);
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
