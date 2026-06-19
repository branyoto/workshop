import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'section';
  children: ReactNode;
}

export function Card({
  as: Component = 'div',
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Component
      className={clsx(
        'rounded-xl border border-neutral/50 bg-white p-4 shadow-sm',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
