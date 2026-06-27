import type { ChangeEvent, HTMLAttributes } from 'react';
import clsx from 'clsx';

export interface CheckboxProps extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  checked: boolean;
  onChange?: (value: boolean, ev: ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({ label, className, checked, onChange, ...props }: Readonly<CheckboxProps>) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
      <input
        type="checkbox"
        checked={checked}
        className={clsx('size-4 rounded border-neutral/60 accent-accent', className)}
        onChange={ev => onChange?.(ev.target.checked, ev)}
        {...props}
      />
      {label}
    </label>
  );
}
