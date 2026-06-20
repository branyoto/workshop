import clsx from 'clsx';

export interface SpinnerProps {
  label?: string;
  className?: string;
}

export function Spinner({ label, className }: Readonly<SpinnerProps>) {
  return (
    <output className={clsx('spinner flex flex-col items-center gap-3', className)}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral border-t-accent" aria-hidden="true" />
      {label ?
        <p className="text-sm text-gray-600">{label}</p>
      : null}
    </output>
  );
}
