import { FormError, JoinGame, SocketEvents } from '@tici-taci/typings';
import { CheckGameDto } from '@tici-taci/validations';
import createValidator from 'class-validator-formik';
import { useFormik } from 'formik';
import { useCallback, useEffect } from 'react';
import { createSocket } from '../contexts/socket.provider';
import { createGameStore } from '../store/game.store';

export const createCheckGameHook =
  (
    useSocket: ReturnType<typeof createSocket>['useSocket'],
    useGameStore: ReturnType<typeof createGameStore>
  ) =>
  (openModal: () => void) => {
    const socket = useSocket();
    const { check } = useGameStore();

    const submit = useCallback((values: CheckGameDto) => {
      socket.emit('check', {
        ...values
      });
    }, []);

    const { resetForm, setSubmitting, setErrors, ...formikHelpers } = useFormik(
      {
        initialValues: new CheckGameDto(),
        validate: createValidator(CheckGameDto),
        onSubmit: submit
      }
    );

    useEffect(() => {
      const events: SocketEvents = {
        'check-complete': (game: JoinGame) => {
          resetForm();
          check(game);
          openModal();
          setSubmitting(false);
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
      resetForm,
      setSubmitting,
      setErrors,
      ...formikHelpers
    };
  };
