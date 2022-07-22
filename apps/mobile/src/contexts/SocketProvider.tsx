import { createSocket } from '@tici-taci/business-logic';

export const { SocketProvider, useSocket } = createSocket(
  'ws://192.168.0.114:3001'
);
