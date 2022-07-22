import { Location as LocationWeb } from 'react-router-dom';
import { Location as LocationNative } from 'react-router-native';
import { createSocket } from '../contexts/socket.provider';
import { createGameStore } from '../store/game.store';

export const createEmptyGameHook =
  (
    useSocket: ReturnType<typeof createSocket>['useSocket'],
    useGameStore: ReturnType<typeof createGameStore>
  ) =>
  (gamepath: string) => {
    const empty = useGameStore((state) => state.empty);
    const socket = useSocket();
    return (location: LocationWeb | LocationNative) => {
      if (!location.pathname.startsWith(gamepath)) {
        socket.disconnect();
        empty();
        setTimeout(() => {
          socket.connect();
        });
      }
    };
  };
