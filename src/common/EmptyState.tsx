import type { ReactNode } from 'react';

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: Readonly<EmptyStateProps>) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <p className="text-lg font-medium text-gray-900">{title}</p>
      {description ?
        <p className="max-w-sm text-sm text-gray-600">{description}</p>
      : null}
      {action ?
        <div className="mt-2">{action}</div>
      : null}
    </div>
  );
}
