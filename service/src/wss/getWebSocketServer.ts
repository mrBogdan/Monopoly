import { Server, IncomingMessage } from 'node:http';
import { parse } from 'node:url';

import { WebSocketServer, WebSocket } from 'ws';

import { Container } from '../di';
import { getBearer, Secure } from '../secure';

import { messageHandler } from './messageHandler';
import { MemoryUserSocketRepository, UserSocket } from './user-socket';
import { WsCloseCode } from './WsCloseCode';

type UserInfo = {
  id: string;
}

export const getWebSocketServer = (container: Container): WebSocketServer => {
  const server = container.resolve<Server>(Server);
  const userSocketRepository = container.resolve<MemoryUserSocketRepository>(MemoryUserSocketRepository);

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

  wss.on('connection', registerUserSocket(container));

  wss.on('connection', (ws) => {
    ws.on('error', console.error);

    ws.on('message', messageHandler(ws, container));

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

const registerUserSocket = (container: Container) => (ws: WebSocket, request: IncomingMessage) => {
  const secure = container.resolve<Secure>(Secure);
  const userSocketRepository = container.resolve<MemoryUserSocketRepository>(MemoryUserSocketRepository);

  const url = parse(request.url ?? '', true);
  const token = getBearer(url.query?.token as string);

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

  userSocketRepository.addUserSocket(new UserSocket(user.id, ws));
}
