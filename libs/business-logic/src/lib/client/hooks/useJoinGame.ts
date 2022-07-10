import { FormError, SocketEvents } from '@tici-taci/typings';
import { JoinGameFormDto } from '@tici-taci/validations';
import createValidator from 'class-validator-formik';
import { useFormik } from 'formik';
import { useCallback, useEffect } from 'react';
import { createSocket } from '../contexts/socket.provider';
import { createGameStore } from '../store/game.store';
import { createModalStore } from '../store/modal.store';

export const createJoinGameHook =
  (
    useSocket: ReturnType<typeof createSocket>['useSocket'],
    useGameStore: ReturnType<typeof createGameStore>,
    useModalStore: ReturnType<typeof createModalStore>
  ) =>
  (navigate: (path: string) => void) => {
    const { setIsOpen, isOpen } = useModalStore();
    const socket = useSocket();
    const { check, code, title } = useGameStore();

    const submit = useCallback(async (values: JoinGameFormDto) => {
      socket.emit('join', {
        code,
        joiner: {
          name: values.name
        }
      });
    }, []);

    const { resetForm, setErrors, setSubmitting, ...formikHelpers } = useFormik(
      {
        initialValues: new JoinGameFormDto(),
        onSubmit: submit,
        validate: createValidator(JoinGameFormDto)
      }
    );

    useEffect(() => {
      const events: SocketEvents = {
        'join-complete': (data) => {
          resetForm();
          check(data);
          setIsOpen(false);
          navigate('/game/' + data.code);
        },
        exception: ({ messages }: FormError) => {
          setErrors(messages);
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

    useEffect(() => {
      isOpen && resetForm();
    }, [isOpen]);

    return { title, resetForm, setErrors, setSubmitting, ...formikHelpers };
  };
