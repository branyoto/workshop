import type { ChangeEvent, HTMLAttributes } from 'react';
import clsx from 'clsx';

export interface CheckboxProps extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  checked: boolean;
  onChange?: (value: boolean, ev: ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({ label, className, checked, onChange, ...props }: Readonly<CheckboxProps>) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-primary-900">
      <input
        type="checkbox"
        checked={checked}
        className={clsx(
          'size-4 rounded border-primary-700 accent-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-300',
          className,
        )}
        onChange={ev => onChange?.(ev.target.checked, ev)}
        {...props}
      />
      {label}
    </label>
  );
}
