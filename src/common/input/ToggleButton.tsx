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
        active ? 'border-accent bg-accent text-white' : 'border-neutral/60 bg-white text-gray-700 hover:border-accent hover:text-accent',
      )}
    >
      {label}
    </button>
  );
}
