export function notNull<T>(item: T | null | undefined): item is T {
  return item != null;
}
export function notEmpty<T = string>(item: T | null | '' | undefined): item is T {
  return item != null && item !== '';
}
export function notFalsy<T>(item: T | null | '' | 0 | undefined | false): item is T {
  return !!item;
}
