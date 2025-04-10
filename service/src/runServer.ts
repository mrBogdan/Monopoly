import { Server } from 'node:http';
import { WebSocketServer } from 'ws';

import { Container } from './di';

import { ConfigService } from './config/ConfigService';
import { getMessageHandler, injectWebSocketServer } from './wss';
import { requestHandler, Router } from './http';

export const runServer = async (container: Container) => {
  const server = container.resolve<Server>(Server);
  const wss = container.resolve<WebSocketServer>(WebSocketServer);
  const router = container.resolve<Router>(Router);
  const config: ConfigService = container.resolve<ConfigService>(ConfigService);
  injectWebSocketServer(server, wss);

  server.on('request', requestHandler(router, container));
  wss.on('connection', ws => {
    ws.on('message', getMessageHandler(ws, container));
  });

  server.listen(config.get('httpPort'), () => console.log(`Listening on ${config.get('httpPort')}`));
};
