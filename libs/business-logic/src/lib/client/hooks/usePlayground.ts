import {
  FormError,
  JoinGame,
  PlaygroundState,
  SocketEvents
} from '@tici-taci/typings';
import { useCallback, useEffect, useReducer } from 'react';
import { defaultPlaygroundState } from '../constants/Playground';
import { createSocket } from '../contexts/socket.provider';
import { playgroundReducer } from '../reducers/playground.reducer';
import { createGameStore } from '../store/game.store';
import { Platform } from 'react-native';

export const createPlaygroundHook =
  (
    useSocket: ReturnType<typeof createSocket>['useSocket'],
    useGameStore: ReturnType<typeof createGameStore>
  ) =>
  (
    navigate: (path: string) => void,
    openModal: () => void,
    closeModal: () => void,
    code: string
  ) => {
    const {
      join,
      check,
      opponentLeft,
      updateScores,
      code: storedCode
    } = useGameStore();

    const players = useGameStore(({ players }) => players);

    const [playgroundState, dispatch] = useReducer(
      playgroundReducer,
      defaultPlaygroundState(true)
    );
    const socket = useSocket();

    useEffect(() => {
      console.log('effect');
      const socketEventHandlers: SocketEvents = {
        'opponent-left': (game: JoinGame) => {
          opponentLeft(game);

          dispatch({
            type: 'start',
            payload: {
              xIsNext: game.flip
            }
          });
        },
        'move-complete': ({ scores, ...state }: PlaygroundState) => {
          dispatch({ type: 'move', payload: { ...state, canMove: true } });
          updateScores(scores);
        },
        'restart-made': ({ xIsNext }: { xIsNext: boolean }) => {
          dispatch({ type: 'start', payload: { xIsNext } });
        },
        'check-complete': (game: JoinGame | { error: boolean }) => {
          check(game as JoinGame);
          dispatch({
            type: 'flip',
            payload: {
              xIsNext: (game as JoinGame).flip
            }
          });
          openModal();
          return;
        },
        'get-complete': (game: JoinGame | { error: boolean }) => {
          dispatch({
            type: 'flip',
            payload: {
              xIsNext: (game as JoinGame).flip
            }
          });
          return;
        },
        exception: ({ errors }: FormError) => {
          alert(Object.values(errors).join('\n '));
          navigate('/');
          closeModal();
        },
        'player-joined': (game: JoinGame) => {
          join(game.joiner);

          dispatch({
            type: 'start',
            payload: {
              xIsNext: game.flip
            }
          });
        }
      };

      Object.keys(socketEventHandlers).forEach((event) => {
        socket.on(event, socketEventHandlers[event]);
      });

      if (!storedCode) {
        console.log('Check');

        socket.emit('check', { code });
      } else {
        console.log('Get');

        socket.emit('get', { code });
      }

      return () => {
        Object.keys(socketEventHandlers).forEach((event) => {
          socket.off(event, socketEventHandlers[event]);
        });
      };
    }, [storedCode, dispatch]);

    const mark = useCallback(
      (i: number) => {
        const localSign = players.local?.sign
          ? players.local.sign
          : players.remote?.sign === 'X'
          ? 'O'
          : 'X';

        dispatch({
          type: 'mark',
          payload: {
            idx: i,
            localSign,
            canMove: false,
            socket,
            code: storedCode
          }
        });
      },
      [storedCode, dispatch]
    );

    const restart = useCallback(() => {
      socket.emit('restart', {
        code: storedCode
      });
    }, [storedCode]);

    return {
      restart,
      mark,
      players,
      ...playgroundState
    };
  };
