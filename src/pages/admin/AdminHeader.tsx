import { useAdminModification } from './ModificationProvider/useAdminModification';
import { Button } from '../../common/Button';
import { Check, Copy, Download } from 'lucide-react';

export function AdminHeader() {
  const { status, copy, download } = useAdminModification();

  return (
    <div className="flex flex-col gap-4 pb-5 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Admin</p>
        <h1 id="admin-heading" className="mt-1 text-3xl font-semibold text-gray-950">
          Catalog editor
        </h1>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={copy}>
          {status === 'copied' ?
            <Check className="size-4" aria-hidden="true" />
          : <Copy className="size-4" aria-hidden="true" />}
          Copy JSON
        </Button>
        <Button onClick={download}>
          {status === 'downloaded' ?
            <Check className="size-4" aria-hidden="true" />
          : <Download className="size-4" aria-hidden="true" />}
          Download cms.json
        </Button>
      </div>
    </div>
  );
}
