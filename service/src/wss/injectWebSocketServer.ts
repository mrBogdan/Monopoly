import { Server } from 'node:http';

import { WebSocketServer } from 'ws';


export const injectWebSocketServer = (server: Server, wss: WebSocketServer): void => {
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
