import {
  autoUpdate,
  flip,
  FloatingPortal,
  hide,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { type ReactNode, useCallback, useEffect } from 'react';

export interface AnchoredPopoverProps {
  anchor: ReactNode;
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AnchoredPopover({ anchor, children, open, onOpenChange }: Readonly<AnchoredPopoverProps>) {
  const { refs, floatingStyles, context, middlewareData, isPositioned } = useFloating({
    open,
    onOpenChange,
    placement: 'bottom-end',
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip(), shift({ padding: 8 }), hide({ padding: 8 })],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);
  const referenceHidden = middlewareData.hide?.referenceHidden;
  const setReference = useCallback((node: HTMLElement | null) => refs.setReference(node), [refs]);
  const setFloating = useCallback((node: HTMLElement | null) => refs.setFloating(node), [refs]);

  useEffect(() => {
    if (open && isPositioned && referenceHidden) {
      onOpenChange(false);
    }
  }, [isPositioned, onOpenChange, open, referenceHidden]);

  return (
    <>
      <span ref={setReference} className="inline-flex" {...getReferenceProps()}>
        <button type="button" className="cursor-pointer rounded-xl hover:bg-neutral/20" aria-expanded={open} aria-label="Ajouter un libellé">
          {anchor}
        </button>
      </span>
      {open ?
        <FloatingPortal id="floating-ui-popovers">
          <div
            ref={setFloating}
            className="z-50"
            style={{ ...floatingStyles, visibility: referenceHidden ? 'hidden' : 'visible' }}
            {...getFloatingProps()}
          >
            {children}
          </div>
        </FloatingPortal>
      : null}
    </>
  );
}
