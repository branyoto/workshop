import clsx from 'clsx';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from './Button';

export interface SnackbarProps {
  open: boolean;
  message: string;
  onClose: () => void;
  action?: ReactNode;
  className?: string;
}

export function Snackbar({ open, message, onClose, action, className }: Readonly<SnackbarProps>) {
  if (!open) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        'fixed bottom-4 left-1/2 z-50 flex max-w-md -translate-x-1/2 items-center gap-3 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg',
        className,
      )}
    >
      <span className="flex-1">{message}</span>
      {action}
      <Button variant="text" className="px-2 py-1 text-white hover:bg-white/10" onClick={onClose} aria-label="Close notification">
        <X aria-hidden="true" className="size-4" strokeWidth={1.75} />
      </Button>
    </div>
  );
}
