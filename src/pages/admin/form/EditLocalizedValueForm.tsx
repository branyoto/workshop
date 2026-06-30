import { X } from 'lucide-react';
import { TextField } from '../../../common/input/TextField';
import { Button } from '../../../common/Button';
import { useCallback, useState, type SubmitEvent } from 'react';
import type { LocalizedText } from '../../../services/providers/cms/types';
import type { Noop } from '../../../utils/useDisclosure';
import type { EditLocalizedText } from '../ModificationProvider/AdminModificationReducer';

export interface EditLocalizedValueFormProps {
  close: Noop;
  onSubmit: (values: EditLocalizedText) => void;
}

export function EditLocalizedValueForm({ close, onSubmit }: Readonly<EditLocalizedValueFormProps>) {
  const [id, setId] = useState('');
  const [value, setValue] = useState<LocalizedText>({ fr: '' });

  const canSubmit = !!id && !!value.fr;

  const handleSubmit = useCallback(
    (ev: SubmitEvent<HTMLFormElement>) => {
      ev.stopPropagation();
      ev.preventDefault();
      onSubmit({ id, value });
    },
    [onSubmit, id, value],
  );

  return (
    <form className="grid w-72 gap-3 rounded-lg border border-bg-200 bg-bg-50 p-4 shadow-lg" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-primary-950">Nouveau libellé</p>
        <button type="button" className="rounded-full p-1 text-primary-600 hover:bg-bg-100" aria-label="Fermer" onClick={close}>
          <X className="size-4" />
        </button>
      </div>
      <TextField label="Clé" value={id} onChange={setId} autoFocus />
      <div>
        <TextField label="Traduction FR" value={value.fr} onChange={fr => setValue(prev => ({ ...prev, fr }))} />
        <TextField label="Traduction EN" value={value.en} onChange={en => setValue(prev => ({ ...prev, en }))} />
      </div>
      <Button type="submit" className="px-3 py-1.5" disabled={!canSubmit}>
        Ajouter
      </Button>
    </form>
  );
}
