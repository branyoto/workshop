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
}

const sideClasses: Record<DrawerSide, string> = {
  left: 'left-0',
  right: 'right-0',
};

const panelAnimation: Record<DrawerSide, string> = {
  left: 'data-[open=true]:translate-x-0 -translate-x-full',
  right: 'data-[open=true]:translate-x-0 translate-x-full',
};

export function Drawer({
  open,
  onClose,
  side,
  title,
  children,
  footer,
}: DrawerProps) {
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
    <div className="fixed inset-0 z-40 flex">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close drawer"
        onClick={onClose}
      />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        data-open={open}
        className={clsx(
          'relative z-10 flex h-full w-80 max-w-[85vw] flex-col bg-white shadow-xl transition-transform duration-200 ease-out',
          sideClasses[side],
          panelAnimation[side],
        )}
      >
        <header className="flex items-center justify-between border-b border-neutral/50 px-4 py-3">
          {title ? (
            <h2 id={titleId} className="text-base font-semibold text-gray-900">
              {title}
            </h2>
          ) : (
            <span />
          )}
          <Button
            ref={closeButtonRef}
            variant="ghost"
            className="px-2 py-1"
            onClick={onClose}
            aria-label="Close drawer"
          >
            ✕
          </Button>
        </header>
        <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>
        {footer ? (
          <footer className="border-t border-neutral/50 px-4 py-3">{footer}</footer>
        ) : null}
      </aside>
    </div>
  );
}
