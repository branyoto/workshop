import clsx from 'clsx';

export interface ToggleButtonProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

export function ToggleButton({ active, label, onClick }: Readonly<ToggleButtonProps>) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={clsx(
        'rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
        active ? 'border-accent-400 bg-primary-500 text-primary-50' : 'border-bg-300 bg-bg-50 text-primary-700 hover:border-accent-400 hover:text-accent-500',
      )}
    >
      {label}
    </button>
  );
}
