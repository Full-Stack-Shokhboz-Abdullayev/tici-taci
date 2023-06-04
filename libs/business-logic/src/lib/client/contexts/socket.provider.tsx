import { createContext, FC, ReactNode, useContext, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
let count = 0;
export const createSocket = (_URI: string) => {
  const socket = io(_URI);

  const SocketContext = createContext<Socket>(socket);

  const useSocket = () => {
    return useContext(SocketContext);
  };

  const SocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
    useEffect(() => {
      return () => {
        socket.close();
      };
    }, []);
    return (
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    );
  };
  return {
    SocketProvider,
    useSocket
  };
};
