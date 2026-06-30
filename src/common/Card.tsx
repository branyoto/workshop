import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'section';
  children: ReactNode;
}

export function Card({ as: Component = 'div', className, children, ...props }: Readonly<CardProps>) {
  return (
    <Component className={clsx('rounded-xl border border-bg-200 bg-bg-50 p-4 shadow-sm', className)} {...props}>
      {children}
    </Component>
  );
}
