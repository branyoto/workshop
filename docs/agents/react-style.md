# React Code Style

Apply these rules whenever writing or reviewing React code in this project.

## Structure

One component per file. One custom hook per file. File name matches the exported name.

## Props

### Declaration

Every component that takes props gets a co-located, exported `interface`. No separate file; always alongside the component. Skip the interface only when the component takes no props at all.

Prefer `interface` over `type` alias for props — use `type` only for unions or mapped types that `interface` cannot express.

```tsx
// ✓
export interface ProductCardProps {
  product: Product;
}
export function ProductCard({ product }: Readonly<ProductCardProps>) { … }

// ✗ type alias for a plain props shape
type ProductCardProps = { product: Product };

// ✗ missing export
interface ProductCardProps { … }
```

### Readonly

Always annotate the props parameter as `Readonly<Props>`. Prevents accidental mutation; documents intent at the callsite.

### Forwarded props

When a component's sole job is to wrap a child and forward props to it, extend the child's props type instead of redeclaring every prop.

```tsx
// ✓ extend native element props
export interface IconButtonProps extends Readonly<React.ComponentPropsWithoutRef<'button'>> {
  icon: string;
}
export function IconButton({ icon, ...rest }: IconButtonProps) {
  return <button {...rest}><Icon name={icon} /></button>;
}

// ✓ extend another component's props
export interface PrimaryButtonProps extends Readonly<ButtonProps> {
  label: string;
}
```

## Function declarations

Use `function` declarations for components and named hooks. Arrow functions only for **lambdas** — anonymous callbacks passed inline, never assigned to an exported name.

```tsx
// ✓ declarations
export interface ProductCardProps { product: Product; }
export function ProductCard({ product }: Readonly<ProductCardProps>) { … }
export function useCart() { … }

// ✓ lambda — inline, no name needed
items.map(item => <Item key={item.id} item={item} />)

// ✗ named arrow export
const ProductCard = ({ product }: Readonly<ProductCardProps>) => { … }
```

## Small reusable functions

Extract any logic used in more than one place into a named utility function or custom hook. Prefer many small, single-purpose functions over one large one.

## Stable refs

A **stable ref** is a function whose identity is guaranteed constant across renders:

- every setter from `useState` (`setX`, `dispatch`)
- every function wrapped as `useCallback(fn, [])`
- any prop explicitly contracted as stable (see below)

**Stable refs never enter any dependency array** — `useEffect`, `useCallback`, `useMemo`, or any custom hook deps list. Their identity cannot change, so listing them is a no-op that creates lint noise and misleads readers.

```tsx
// ✓ setData is a stable ref — omit from deps
useEffect(() => {
  fetchData().then(data => setData(data));
}, [fetchData]);

// ✗ setData listed — wrong
useEffect(() => {
  fetchData().then(data => setData(data));
}, [fetchData, setData]);
```

## Stable-ref props

When a prop is a callback the parent provides to behave like a setter — any `set*`, `on*`, `dispatch`, or equivalent — treat it as a **stable ref** at the receiving end:

- Mark the contract at the prop type with a `/** @stable */` JSDoc tag.
- Never include it in any dependency array inside the component.

```tsx
export interface CartButtonProps {
  /** @stable */
  onAdd: (item: Item) => void;
}

export function CartButton({ onAdd }: Readonly<CartButtonProps>) {
  // onAdd is a stable ref — excluded from deps
  useEffect(() => {
    register(onAdd);
  }, []);
}
```

The parent is responsible for honoring the contract (passing a stable ref, i.e. a setter or a `useCallback(fn, [])`).

## Hooks

Reach for hooks to encapsulate and share stateful logic. Use `useMemo` for expensive derived values, `useCallback` when passing stable callbacks down, and custom hooks to lift logic out of components.

