import { Server } from 'node:http';
import { WebSocketServer } from 'ws';

import { Container } from './di';

import { ConfigService } from './config/ConfigService';
import { messageHandler, injectWebSocketServer } from './wss';
import { requestHandler } from './http';

export const runServer = async (container: Container) => {
  const server = container.resolve<Server>(Server);
  const wss = container.resolve<WebSocketServer>(WebSocketServer);
  const config: ConfigService = container.resolve<ConfigService>(ConfigService);
  injectWebSocketServer(server, wss);

  server.on('request', requestHandler(container));
  wss.on('connection', ws => {
    ws.on('message', messageHandler(ws, container));
  });

  server.listen(config.get('httpPort'), () => console.log(`Listening on ${config.get('httpPort')}`));
};
