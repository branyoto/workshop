import type { ChangeEvent, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

export interface NumberInputProps<T extends number | string | null | undefined> extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> {
  value?: T;
  placeholder?: string | undefined;
  onChange: (value: T, event: ChangeEvent<HTMLInputElement>) => void;
}

export function NumberInput<T extends number | string | null | undefined>({
  value,
  placeholder,
  onChange,
  className,
  ...props
}: Readonly<NumberInputProps<T>>) {
  return (
    <input
      className={clsx(
        'w-full rounded-md border border-neutral/60 bg-white px-2 py-1 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent',
        className,
      )}
      type="number"
      placeholder={placeholder}
      aria-label={placeholder}
      value={value ?? ''}
      onChange={e => onChange(e.target.value as T, e)}
      {...props}
    />
  );
}
