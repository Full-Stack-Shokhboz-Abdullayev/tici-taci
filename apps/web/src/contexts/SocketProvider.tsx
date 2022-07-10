import { createSocket } from '@tici-taci/business-logic';

export const { SocketProvider, useSocket } = createSocket(
  import.meta.env.VITE_SOCKET_GATEWAY
);
