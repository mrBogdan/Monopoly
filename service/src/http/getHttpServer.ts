import http, { Server } from 'node:http';

import { getWebSocketServer } from '../wss/getWebSocketServer';
import { requestHandler } from './requestHandler';
import { Router } from './router/Router';
import { ModuleManager } from '../ModuleManager';
import { getGlobalContainer } from '../di/globalContainer';

let server: Server | null = null;

export const getHttpServer = (modules: unknown[]): Server => {
  if (!server) {
    ModuleManager.registerModules(modules);

    const router = new Router();

    server = http.createServer(requestHandler(router, getGlobalContainer()));

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
  }


  return server;
};

