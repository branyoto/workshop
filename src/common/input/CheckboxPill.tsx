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
        checked ? 'border-accent bg-accent/10 text-gray-950' : 'border-neutral/50 text-gray-700 hover:bg-neutral/20',
      )}
    >
      <input type="checkbox" checked={checked} onChange={onChange} className="size-4 accent-accent hidden" />
      <span>{label}</span>
      <span className="text-xs text-gray-500">{value}</span>
    </label>
  );
}
