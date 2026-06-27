import type { ChangeEvent } from 'react';

export interface TextFieldProps {
  label: string;
  value: string | number;
  disabled?: boolean;
  type?: string;
  min?: number;
  step?: string;
  onChange?: (value: string, ev: ChangeEvent<HTMLInputElement>) => void;
}

export function TextField({ label, value, disabled, type = 'text', min, step, onChange }: Readonly<TextFieldProps>) {
  return (
    <label className="grid gap-1 text-sm font-medium text-gray-800">
      {label}
      <input
        className="w-full rounded-md border border-neutral/60 bg-white px-3 py-2 text-sm font-normal text-gray-950 disabled:bg-gray-100 disabled:text-gray-500"
        value={value}
        disabled={disabled}
        type={type}
        min={min}
        step={step}
        onChange={ev => onChange?.(ev.target.value, ev)}
      />
    </label>
  );
}
