import clsx from 'clsx';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 text-primary-50 hover:bg-primary-600 focus-visible:ring-primary-500/50',
  secondary: 'bg-secondary-300 text-primary-900 hover:bg-secondary-400 focus-visible:ring-secondary-300/50',
  text: 'bg-transparent text-primary-900 hover:bg-bg-200/50 focus-visible:ring-bg-100/50',
  danger: 'bg-primary-700 text-primary-50 hover:bg-primary-800 focus-visible:ring-primary-600/50',
};

export const Button = forwardRef<HTMLButtonElement, Readonly<ButtonProps>>(function Button(
  { variant = 'primary', className, children, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
