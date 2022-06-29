import { ReactElement } from 'react';
import { Nullish } from '../../../shared/types/nullish.type';

export interface ModalState {
  isOpen: boolean;
  component: Nullish<ReactElement>;
  onClose: Nullish<() => void>;
  onOpen: Nullish<() => void>;
}
