import http, { Server } from 'node:http';

import { getWebSocketServer } from '../wss/getWebSocketServer';
import { requestHandler } from './requestHandler';
import { Router } from './router/Router';
import { Container } from '../di/Container';

export const getHttpServer = (router: Router, diContainer: Container): Server => {
  const server = http.createServer(requestHandler(router, diContainer));

  const wss = getWebSocketServer();

  server.on('upgrade', (request, socket, head) => {
    if (request.url === '/ws') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  return server;
};

