import { Server } from 'node:http';

export const getHttpServer = (): Server => {
  return new Server();
};

