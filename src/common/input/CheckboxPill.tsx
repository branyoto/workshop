import clsx from 'clsx';

export interface CheckboxPillProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}

export function CheckboxPill({ label, value, checked, onChange }: Readonly<CheckboxPillProps>) {
  return (
    <label
      className={clsx(
        'flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors',
        checked ? 'border-accent-400 bg-accent-50 text-primary-950' : 'border-bg-200 text-primary-700 hover:bg-bg-100',
      )}
    >
      <input type="checkbox" checked={checked} onChange={onChange} className="size-4 accent-accent-400 hidden" />
      <span>{label}</span>
      <span className="text-xs text-primary-500">{value}</span>
    </label>
  );
}
