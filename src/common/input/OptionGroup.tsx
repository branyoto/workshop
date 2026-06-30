import type { ReactNode } from 'react';

export interface OptionGroupProps {
  title: string;
  children: ReactNode;
}

export function OptionGroup({ title, children }: Readonly<OptionGroupProps>) {
  return (
    <fieldset className="rounded-lg border border-bg-200 p-4">
      <legend className="px-1 text-sm font-semibold text-primary-950">{title}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}
