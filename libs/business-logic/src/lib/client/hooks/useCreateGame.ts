import { CreateGame, FormError, SocketEvents } from '@tici-taci/typings';
import { CreateGameDto } from '@tici-taci/validations';
import createValidator from 'class-validator-formik';
import { useFormik } from 'formik';
import { useCallback, useEffect } from 'react';
import { createSocket } from '../contexts/socket.provider';
import { createGameStore } from '../store/game.store';
import { createModalStore } from '../store/modal.store';

export const createCreateGameHook =
  (
    useSocket: ReturnType<typeof createSocket>['useSocket'],
    useGameStore: ReturnType<typeof createGameStore>,
    useModalStore: ReturnType<typeof createModalStore>
  ) =>
  (navigate: (path: string) => void) => {
    const { setIsOpen, isOpen } = useModalStore();
    const socket = useSocket();
    const { create } = useGameStore();

    const submit = useCallback(async (values: CreateGameDto) => {
      socket.emit('create', {
        ...values
      });
    }, []);

    const { resetForm, setErrors, setSubmitting, ...formikHelpers } = useFormik(
      {
        initialValues: new CreateGameDto(),
        onSubmit: submit,
        validate: createValidator(CreateGameDto)
      }
    );

    useEffect(() => {
      const events: SocketEvents = {
        'create-complete': (data: CreateGame) => {
          create(data);
          setIsOpen(false);
          resetForm();
          navigate('/game/' + data.code);
        },
        exception: ({ errors }: FormError) => {
          setErrors(errors);
          setSubmitting(false);
        }
      };

      Object.keys(events).forEach((event) => {
        socket.on(event, events[event]);
      });

      return () => {
        Object.keys(events).forEach((event) => {
          socket.off(event, events[event]);
        });
      };
    }, []);

    return {
      isOpen,
      resetForm,
      setErrors,
      setSubmitting,
      ...formikHelpers
    };
  };
