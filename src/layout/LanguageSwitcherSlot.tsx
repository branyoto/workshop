import clsx from 'clsx';
import type { ReactNode } from 'react';

export interface LanguageSwitcherSlotProps {
  children?: ReactNode;
  className?: string;
}

export function LanguageSwitcherSlot({ children, className }: Readonly<LanguageSwitcherSlotProps>) {
  return (
    <div className={clsx('flex items-center gap-1', className)} aria-label="Language switcher">
      {children ?? (
        <>
          <span className="rounded-md bg-primary/60 px-2 py-1 text-xs font-medium">FR</span>
          <span className="rounded-md px-2 py-1 text-xs font-medium text-gray-600">EN</span>
        </>
      )}
    </div>
  );
}
