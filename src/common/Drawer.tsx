import clsx from 'clsx';
import { useEffect, useId, useRef, type ReactNode } from 'react';
import { Button } from './Button';

export type DrawerSide = 'left' | 'right';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side: DrawerSide;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  /** When true the drawer expands to full-screen on mobile (<sm) */
  mobileFullScreen?: boolean;
  'data-testid'?: string;
}

const sideClasses: Record<DrawerSide, string> = { left: 'justify-start', right: 'justify-end' };

const panelAnimation: Record<DrawerSide, string> = {
  left: 'data-[open=true]:translate-x-0 -translate-x-full',
  right: 'data-[open=true]:translate-x-0 translate-x-full',
};

export function Drawer({ open, onClose, side, title, children, footer, mobileFullScreen = false, 'data-testid': testId }: Readonly<DrawerProps>) {
  const titleId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousFocus = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previousFocus?.focus();
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className={clsx('fixed inset-0 z-40 flex', sideClasses[side])}>
      <button type="button" className="absolute inset-0 bg-black/40" aria-label="Close drawer" onClick={onClose} />
      <aside
        ref={panelRef}
        aria-labelledby={title ? titleId : undefined}
        data-open={open}
        data-testid={testId}
        className={clsx(
          'relative z-10 flex h-full flex-col bg-white shadow-xl transition-transform duration-200 ease-out',
          mobileFullScreen ? 'w-full sm:w-80 sm:max-w-[85vw]' : 'w-80 max-w-[85vw]',
          panelAnimation[side],
        )}
      >
        <header className="flex items-center justify-between border-b border-neutral/50 px-4 py-3">
          {title ?
            <h2 id={titleId} className="text-base font-semibold text-gray-900">
              {title}
            </h2>
          : <span />}
          <Button ref={closeButtonRef} variant="ghost" className="px-2 py-1" onClick={onClose} aria-label="Close drawer">
            ✕
          </Button>
        </header>
        <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>
        {footer ?
          <footer className="border-t border-neutral/50 px-4 py-3">{footer}</footer>
        : null}
      </aside>
    </div>
  );
}
