import type { ChangeEvent, HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

export interface TextFieldProps extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: ReactNode;
  placeholder?: string;
  value: string | number;
  disabled?: boolean;
  type?: string;
  min?: number;
  step?: string;
  onChange?: (value: string, ev: ChangeEvent<HTMLInputElement>) => void;
}

export function TextField({ label, type = 'text', className, onChange, ...props }: Readonly<TextFieldProps>) {
  return (
    <label className={clsx('grid gap-1 text-sm font-medium text-gray-800', className)}>
      {label}
      <input
        className="w-full rounded-md border border-neutral/60 bg-white px-3 py-2 text-sm font-normal text-gray-950 disabled:bg-gray-100 disabled:text-gray-500"
        type={type}
        onChange={ev => onChange?.(ev.target.value, ev)}
        {...props}
      />
    </label>
  );
}
