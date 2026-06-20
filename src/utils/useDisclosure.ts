import type { Dispatch, SetStateAction } from 'react';
import { useMemo, useState } from 'react';

export type Noop = () => void;

type UseDisclosureArrayReturnType = [boolean, Noop, Noop, Noop, Dispatch<SetStateAction<boolean>>];
type UseDisclosureObjectReturnType = { opened: boolean; close: Noop; open: Noop; toggle: Noop; setOpened: Dispatch<SetStateAction<boolean>> };
export type UseDisclosureOptions = { onClose?: Noop; onOpen?: Noop };
export type UseDisclosureReturnType = UseDisclosureArrayReturnType & UseDisclosureObjectReturnType;

/**
 * Create a disclosure state that allow to handle every common open/close mechanisms.
 *
 * The returned value will contain:
 * - opened: the state of the disclosure
 * - close: a function to close the state (set to false)
 * - open: a function to open the state (set to true)
 * - toggle: a function to invert the state (true become false and false become true)
 * - setOpened: a function to handle the state logic yourself
 *
 * @param defaultState - the initial value of the disclosure (default: false)
 * @param handlers - optional handlers to call when switching state. The handlers will be called only when the state changes (e.g. if you call `open` twice onOpen will only be called once)
 *
 * @returns UseDisclosureReturnType - an object that can be destructured as an array or as an object indifferently.
 * The array destructuration will receive the keys in the order described above.
 *
 * ```ts
 * const [myOpened, myOpen, myClose, myToggle, mySetOpened] = useDisclosure();
 * // or
 * const {opened, open, close, toggle, setOpened} = useDisclosure();
 * ```
 */
export const useDisclosure = (defaultState: boolean = false, handlers?: UseDisclosureOptions): UseDisclosureReturnType => {
  const [opened, setOpened] = useState(defaultState);

  const setters = useMemo(() => {
    const setState: Dispatch<SetStateAction<boolean>> = callback => {
      setOpened(previousState => {
        const newState = typeof callback === 'function' ? callback(previousState) : callback;

        if (previousState && !newState) {
          handlers?.onClose?.();
        } else if (!previousState && newState) {
          handlers?.onOpen?.();
        }
        return newState;
      });
    };
    const close = () => setState(false);
    const open = () => setState(true);
    const toggle = () => setState(previousState => !previousState);
    return { close, open, toggle, setState };
  }, [handlers]);

  return useMemo(() => {
    const result = [opened, setters.open, setters.close, setters.toggle, setters.setState] as UseDisclosureReturnType;
    Object.defineProperties(result, {
      opened: { value: opened },
      open: { value: setters.open },
      close: { value: setters.close },
      toggle: { value: setters.toggle },
      setOpened: { value: setters.setState },
    });

    return result;
  }, [opened, setters]);
};
