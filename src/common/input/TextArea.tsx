import type { ChangeEvent } from 'react';

export interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string, ev: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextArea({ label, value, onChange }: Readonly<TextAreaProps>) {
  return (
    <label className="grid gap-1 text-sm font-medium text-gray-800">
      {label}
      <textarea
        className="min-h-32 w-full resize-y rounded-md border border-neutral/60 bg-white px-3 py-2 text-sm font-normal text-gray-950"
        value={value}
        onChange={ev => onChange(ev.target.value, ev)}
      />
    </label>
  );
}
