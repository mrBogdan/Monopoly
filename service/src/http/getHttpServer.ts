import http, { Server } from 'node:http';

import { getWebSocketServer } from '../wss/getWebSocketServer';
import { requestHandler } from './requestHandler';
import { Router } from './router/Router';
import { ModuleManager } from '../ModuleManager';
import { HealthModule } from '../health/HealthModule';

let server: Server | null = null;

export const getHttpServer = (): Server => {
  if (!server) {
    ModuleManager.registerModules([
      HealthModule,
    ]);

    const router = new Router();

    server = http.createServer(requestHandler(router));

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

