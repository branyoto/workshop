import type { PropsWithChildren } from 'react';

export interface FilterSectionProps extends PropsWithChildren {
  title: string;
}

export function FilterSection({ title, children }: Readonly<FilterSectionProps>) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-primary-500">{title}</h3>
      {children}
    </div>
  );
}
