import { ReactElement } from 'react';
import { Nullish } from '../../../shared/types/nullish.type';

export interface ModalActions {
  setIsOpen: (isOpen: boolean) => void;
  setComponent: (component: Nullish<ReactElement>) => void;
  setEventHandlers: (handlers: { onClose?: Nullish<() => void> }) => void;
}
