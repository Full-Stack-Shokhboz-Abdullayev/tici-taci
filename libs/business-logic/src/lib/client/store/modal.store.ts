import { ModalActions, ModalState } from '@tici-taci/typings';
import create from 'zustand';

export const createModalStore = () =>
  create<ModalState & ModalActions>((set) => ({
    isOpen: false,
    component: null,
    setIsOpen: (isOpen) => {
      set((state) => ({ ...state, isOpen }));
    },
    setComponent: (component) => {
      set((state) => ({ ...state, component }));
    },
    setEventHandlers: (handlers) => {
      set((state) => ({
        ...state,
        onClose: handlers.onClose
      }));
    },
    onClose: null,
    onOpen: null
  }));
