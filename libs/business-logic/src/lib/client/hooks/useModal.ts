import { Nullish } from '@tici-taci/typings';
import { ReactElement } from 'react';
import { createModalStore } from '../store/modal.store';

export const createModalHook =
  (useModalStore: ReturnType<typeof createModalStore>) =>
  (
    component: ReactElement,
    handlers?: {
      onClose?: Nullish<() => void>;
    }
  ) => {
    const { setIsOpen, setComponent, setEventHandlers } = useModalStore();
    return {
      open: () => {
        setComponent(component);
        if (handlers) {
          setEventHandlers(handlers);
        }
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
        setEventHandlers({
          onClose: null
        });
        setComponent(null);
      }
    };
  };
