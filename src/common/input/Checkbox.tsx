import type { HTMLAttributes } from 'react';
import clsx from 'clsx';

export interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  label: string;
  checked: boolean;
}

export function Checkbox({ label, className, checked, ...props }: Readonly<CheckboxProps>) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
      <input type="checkbox" checked={checked} className={clsx('size-4 rounded border-neutral/60 accent-accent', className)} {...props} />
      {label}
    </label>
  );
}
