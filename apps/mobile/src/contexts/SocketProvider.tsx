import { createSocket } from '@tici-taci/business-logic';

export const { SocketProvider, useSocket } = createSocket(
  'ws://localhost:4000'
);
