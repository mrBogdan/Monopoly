import { WebSocketServer, WebSocket } from 'ws';
import { parse } from 'node:url';
import { Server } from 'node:http';

import { Secure } from '../secure';

class WebSocketUser {
  constructor(public id: string) {}
}

const users: Map<WebSocket, WebSocketUser> = new Map();

export const getWebSocketServer = (server: Server, secure: Secure): WebSocketServer => {
  const wss = new WebSocketServer({noServer: true});

  server.on('upgrade', (request, socket, head) => {
    const url = parse(request.url ?? '', true);
    if (url.pathname === '/ws') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  wss.on('error', console.error);

  wss.on('connection', (ws, request) => {
    ws.on('error', console.error);

    const url = parse(request.url ?? '', true);
    const token = url.query.token as string;
    const user = secure.verifyAndDecode(token);

    users.set(ws, user as WebSocketUser);

    ws.on('close', () => {
      users.delete(ws);
    })
  });

  wss.on('close', () => {
    console.log('Server disconnected');
    users.forEach((_, ws) => {
      if (ws.readyState === WebSocket.CLOSED) {
        users.delete(ws);
        ws.close();
      }
    });
  });

  return wss;
};
