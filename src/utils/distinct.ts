declare global {
  interface Array<T> {
    distinct(): T[];
  }

  interface ReadonlyArray<T> {
    distinct(): T[];
  }
}

Object.defineProperty(Array.prototype, 'distinct', {
  value: function distinct<T>(this: T[]) {
    return [...new Set(this)];
  },
  configurable: true,
  writable: true,
});
