import { useAdminModification } from './ModificationProvider/useAdminModification';
import { Button } from '../../common/Button';
import { Check, Copy, Download } from 'lucide-react';

export function AdminHeader() {
  const { status, copy, download } = useAdminModification();

  return (
    <div className="flex flex-col gap-4 pb-5 md:flex-row md:items-end md:justify-between">
      <h1 id="admin-heading" className="text-3xl font-semibold text-gray-950">
        Editeur de produits
      </h1>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={copy}>
          {status === 'copied' ?
            <Check className="size-4" aria-hidden="true" />
          : <Copy className="size-4" aria-hidden="true" />}
          Copier
        </Button>
        <Button onClick={download}>
          {status === 'downloaded' ?
            <Check className="size-4" aria-hidden="true" />
          : <Download className="size-4" aria-hidden="true" />}
          Télécharger
        </Button>
      </div>
    </div>
  );
}
