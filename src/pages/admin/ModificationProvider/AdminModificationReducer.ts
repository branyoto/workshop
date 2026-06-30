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
  | { type: 'SAVE_CATEGORY'; prevId: string; data: Omit<CategoryView, 'children'>; parentId: string | undefined }
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
  | { type: 'MOVE_ITEM_IN_FEATURED'; itemId: string; direction: 'up' | 'down' }
  | { type: 'MOVE_CATEGORY_IN_FEATURED'; categoryId: string; direction: 'up' | 'down' }
  | { type: 'HYDRATE'; updater: SetStateAction<CmsContent> }
  | { type: 'COPY' }
  | { type: 'DOWNLOAD' };

function replaceCategory(categories: CategoryView[], categoryId: string, category?: CategoryView): CategoryView[] {
  return categories
    .map(c => (c.id === categoryId ? category : c))
    .filter(notNull)
    .map(c => (c.children ? { ...c, children: replaceCategory(c.children, categoryId, category) } : c));
}

function removeFromTree(categories: CategoryView[], id: string): CategoryView[] {
  return categories.filter(c => c.id !== id).map(c => (c.children ? { ...c, children: removeFromTree(c.children, id) } : c));
}

function insertInParent(categories: CategoryView[], parentId: string, category: CategoryView): CategoryView[] {
  return categories.map(c => {
    if (c.id === parentId) return { ...c, children: [...(c.children ?? []), category] };
    if (c.children) return { ...c, children: insertInParent(c.children, parentId, category) };
    return c;
  });
}

function findParentCategory(categories: CategoryView[], id: string): CategoryView | undefined {
  for (const cat of categories) {
    if (cat.children?.some(c => c.id === id)) return cat;
    const found = findParentCategory(cat.children ?? [], id);
    if (found) return found;
  }
  return undefined;
}

function reparentOnDelete(categories: CategoryView[], deletedId: string, orphans: CategoryView[]): CategoryView[] {
  return categories.flatMap(c => {
    if (c.id === deletedId) return orphans;
    if (!c.children) return [c];
    return [{ ...c, children: reparentOnDelete(c.children, deletedId, orphans) }];
  });
}

function editCategory(cms: CmsContent, prevId: string, category: CategoryView): CmsContent {
  if (findCategory(cms.categories, prevId)) {
    return { ...cms, categories: replaceCategory(cms.categories, prevId, category) };
  }
  return { ...cms, categories: [...cms.categories, category] };
}

function saveCategoryData(cms: CmsContent, prevId: string, data: Omit<CategoryView, 'children'>, parentId: string | undefined): CmsContent {
  const existing = prevId ? findCategory(cms.categories, prevId) : undefined;
  const updatedCategory: CategoryView = existing?.children ? { ...data, children: existing.children } : data;
  const featuredCategoryIds = cms.featuredCategoryIds.map(id => (id === prevId ? updatedCategory.id : id));
  if (!existing) {
    const categories = parentId === undefined ? [...cms.categories, updatedCategory] : insertInParent(cms.categories, parentId, updatedCategory);
    return { ...cms, categories, featuredCategoryIds };
  }
  const prevParentId = findParentCategory(cms.categories, prevId)?.id;
  if (prevParentId === parentId) {
    return { ...cms, categories: replaceCategory(cms.categories, prevId, updatedCategory), featuredCategoryIds };
  }
  const withoutOld = removeFromTree(cms.categories, prevId);
  const categories = parentId === undefined ? [...withoutOld, updatedCategory] : insertInParent(withoutOld, parentId, updatedCategory);
  return { ...cms, categories, featuredCategoryIds };
}

function moveInFeatured(ids: string[], id: string, direction: 'up' | 'down'): string[] {
  const index = ids.indexOf(id);
  if (index === -1) return ids;
  const newArr = [...ids];
  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= newArr.length) return ids;
  [newArr[index], newArr[targetIndex]] = [newArr[targetIndex], newArr[index]];
  return newArr;
}

function editLocalizedRecord(records: Record<string, LocalizedText>, prevKey: string, text?: EditLocalizedText): Record<string, LocalizedText> {
  const nextRecords = { ...records };
  delete nextRecords[prevKey];
  if (text) {
    nextRecords[text.id] = text.value;
  }
  return nextRecords;
}

function replaceReference(references: string[] | undefined, prevKey: string, nextKey: string): string[] | undefined {
  if (!references?.includes(prevKey) || prevKey === nextKey) {
    return references;
  }
  return references.map(key => (key === prevKey ? nextKey : key)).distinct();
}

function replaceTagInCategories(categories: CategoryView[], prevKey: string, nextKey: string): CategoryView[] {
  return categories.map(c => {
    const tags = replaceReference(c.tags, prevKey, nextKey) ?? c.tags;
    const children = c.children ? replaceTagInCategories(c.children, prevKey, nextKey) : c.children;
    if (tags === c.tags && children === c.children) return c;
    return { ...c, tags, ...(children ? { children } : {}) };
  });
}

function removeTagFromCategories(categories: CategoryView[], tagKey: string): CategoryView[] {
  return categories.map(c => {
    const tags = c.tags.includes(tagKey) ? c.tags.filter(t => t !== tagKey) : c.tags;
    const children = c.children ? removeTagFromCategories(c.children, tagKey) : c.children;
    if (tags === c.tags && children === c.children) return c;
    return { ...c, tags, ...(children ? { children } : {}) };
  });
}

function editColor(cms: CmsContent, prevColorKey: string, color: EditLocalizedText): CmsContent {
  return {
    ...cms,
    colors: editLocalizedRecord(cms.colors, prevColorKey, color),
    items: cms.items.map(item => {
      const colors = replaceReference(item.characteristics?.colors, prevColorKey, color.id) ?? item.characteristics?.colors;
      return colors === item.characteristics?.colors ? item : { ...item, characteristics: { ...item.characteristics, colors } };
    }),
  };
}

function editTag(cms: CmsContent, prevTagKey: string, tag: EditLocalizedText): CmsContent {
  return {
    ...cms,
    tags: editLocalizedRecord(cms.tags, prevTagKey, tag),
    items: cms.items.map(item => {
      const tags = replaceReference(item.tags, prevTagKey, tag.id) ?? item.tags;
      return tags === item.tags ? item : { ...item, tags };
    }),
    categories: replaceTagInCategories(cms.categories, prevTagKey, tag.id),
  };
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

function addItemToFeatured(cms: CmsContent, itemId: string): CmsContent {
  const item = cms.items.find(item => item.id === itemId);
  if (!item) {
    console.warn(`Cannot add item with id ${itemId} to featured. Doesn't exist`);
    return cms;
  }
  return { ...cms, featuredItemIds: [...cms.featuredItemIds, itemId].distinct() };
}

function removeItemFromFeatured(cms: CmsContent, itemId: string): CmsContent {
  return { ...cms, featuredItemIds: cms.featuredItemIds.filter(id => id !== itemId) };
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
    case 'DELETE_CATEGORY': {
      const toDelete = findCategory(state.cms.categories, action.categoryId);
      const orphans = toDelete?.children ?? [];
      const featuredCategoryIds = state.cms.featuredCategoryIds.filter(id => id !== action.categoryId);
      const categories = reparentOnDelete(state.cms.categories, action.categoryId, orphans);
      return { ...state, cms: { ...state.cms, categories, featuredCategoryIds } };
    }
    case 'EDIT_CATEGORY':
      return { ...state, cms: editCategory(state.cms, action.prevCategoryId, action.category) };
    case 'SAVE_CATEGORY':
      return { ...state, cms: saveCategoryData(state.cms, action.prevId, action.data, action.parentId) };
    case 'DELETE_COLOR':
      return {
        ...state,
        cms: {
          ...state.cms,
          colors: editLocalizedRecord(state.cms.colors, action.colorKey),
          items: state.cms.items.map(item =>
            item.characteristics?.colors?.includes(action.colorKey) ?
              { ...item, characteristics: { ...item.characteristics, colors: item.characteristics.colors.filter(c => c !== action.colorKey) } }
            : item,
          ),
        },
      };
    case 'EDIT_COLOR':
      return { ...state, cms: editColor(state.cms, action.prevColorKey, action.color) };
    case 'DELETE_TAG':
      return {
        ...state,
        cms: {
          ...state.cms,
          tags: editLocalizedRecord(state.cms.tags, action.tagKey),
          items: state.cms.items.map(item =>
            item.tags.includes(action.tagKey) ? { ...item, tags: item.tags.filter(t => t !== action.tagKey) } : item,
          ),
          categories: removeTagFromCategories(state.cms.categories, action.tagKey),
        },
      };
    case 'EDIT_TAG':
      return { ...state, cms: editTag(state.cms, action.prevTagKey, action.tag) };
    case 'EDIT_ITEM': {
      let updatedId = action.prevItemId;
      const items = state.cms.items.map(item => {
        if (item.id !== action.prevItemId) return item;
        const next = typeof action.updater === 'function' ? action.updater(item) : action.updater;
        updatedId = next.id;
        return next;
      });
      const featuredItemIds = state.cms.featuredItemIds.map(id => (id === action.prevItemId ? updatedId : id));
      const selectedItemId = state.selectedItemId === action.prevItemId ? updatedId : state.selectedItemId;
      return { ...state, selectedItemId, cms: { ...state.cms, items, featuredItemIds } };
    }
    case 'DELETE_ITEM': {
      const items = state.cms.items.filter(i => i.id !== action.itemId);
      const featuredItemIds = state.cms.featuredItemIds.filter(id => id !== action.itemId);
      const selectedItemId = state.selectedItemId === action.itemId ? (items[0]?.id ?? '') : state.selectedItemId;
      return { ...state, selectedItemId, cms: { ...state.cms, items, featuredItemIds } };
    }
    case 'EDIT_SELECTED_ITEM':
      return editSelectedItem(state, action.action);
    case 'HYDRATE': {
      const nextCms = typeof action.updater === 'function' ? action.updater(state.cms) : action.updater;
      return { ...state, cms: nextCms };
    }
    case 'ADD_CATEGORY_TO_FEATURED':
      return { ...state, cms: addCategoryToFeatured(state.cms, action.categoryId) };
    case 'REMOVE_CATEGORY_FROM_FEATURED':
      return { ...state, cms: removeCategoryFromFeatured(state.cms, action.categoryId) };
    case 'ADD_ITEM_TO_FEATURED':
      return { ...state, cms: addItemToFeatured(state.cms, action.itemId) };
    case 'REMOVE_ITEM_FROM_FEATURED':
      return { ...state, cms: removeItemFromFeatured(state.cms, action.itemId) };
    case 'MOVE_ITEM_IN_FEATURED':
      return { ...state, cms: { ...state.cms, featuredItemIds: moveInFeatured(state.cms.featuredItemIds, action.itemId, action.direction) } };
    case 'MOVE_CATEGORY_IN_FEATURED':
      return {
        ...state,
        cms: { ...state.cms, featuredCategoryIds: moveInFeatured(state.cms.featuredCategoryIds, action.categoryId, action.direction) },
      };
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
