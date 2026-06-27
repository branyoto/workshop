import { useMemo } from 'react';
import { useAdminModification } from './utils/useAdminModification';
import { Button } from '../../common/Button';
import { Check, Copy, Download } from 'lucide-react';

export function AdminHeader() {
  const { state, setState, value } = useAdminModification();

  const exportedJson = useMemo(() => JSON.stringify(value, null, 2), [value]);

  async function copyJson() {
    await navigator.clipboard.writeText(exportedJson);
    setState('copied');
  }

  function downloadJson() {
    const blob = new Blob([exportedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cms.json';
    link.click();
    URL.revokeObjectURL(url);
    setState('downloaded');
  }
  return (
    <div className="flex flex-col gap-4 pb-5 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Admin</p>
        <h1 id="admin-heading" className="mt-1 text-3xl font-semibold text-gray-950">
          Catalog editor
        </h1>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => void copyJson()}>
          {state === 'copied' ?
            <Check className="size-4" aria-hidden="true" />
          : <Copy className="size-4" aria-hidden="true" />}
          Copy JSON
        </Button>
        <Button onClick={downloadJson}>
          {state === 'downloaded' ?
            <Check className="size-4" aria-hidden="true" />
          : <Download className="size-4" aria-hidden="true" />}
          Download cms.json
        </Button>
      </div>
    </div>
  );
}
