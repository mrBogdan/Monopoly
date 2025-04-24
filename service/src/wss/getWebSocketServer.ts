import { Server } from 'node:http';
import { parse } from 'node:url';

import { WebSocketServer, WebSocket } from 'ws';

import { Secure } from '../secure';

import { messageHandler } from './messageHandler';
import { MemoryUserSocketRepository, UserSocket } from './user-socket';
import { WsCloseCode } from './WsCloseCode';

type UserInfo = {
  userId: string;
}

export const getWebSocketServer = (server: Server, secure: Secure, userSocketRepository: MemoryUserSocketRepository): WebSocketServer => {
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

    if (!token) {
      ws.close(WsCloseCode.PolicyViolation, JSON.stringify({message: 'Unauthorized', status: 401, reason: 'Invalid token'}));
      return;
    }

    let user: UserInfo;

    try {
      user = secure.verifyAndDecode(token) as UserInfo;
    } catch {
      ws.close(WsCloseCode.PolicyViolation, JSON.stringify({message: 'Unauthorized', status: 401, reason: 'Invalid token'}));
      return;
    }

    const userSocket = new UserSocket(user.userId, ws);

    userSocketRepository.addUserSocket(userSocket);

    ws.on('close', () => {
      userSocketRepository.removeUserSocket(ws);
    })
  });

  wss.on('close', () => {
    console.log('Server disconnected');
    userSocketRepository.getAllUserSockets().forEach((ws) => {
      if (ws.readyState === WebSocket.CLOSED) {
        userSocketRepository.removeUserSocket(ws);
      }
    });
  });

  return wss;
};
