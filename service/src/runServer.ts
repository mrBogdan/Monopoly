import { Server } from 'node:http';

import { WebSocketServer } from 'ws';

import { ConfigService } from './config/ConfigService';
import { Container } from './di';
import { requestHandler } from './http';
import { messageHandler } from './wss';

export const runServer = async (container: Container) => {
  const server = container.resolve<Server>(Server);
  const wss = container.resolve<WebSocketServer>(WebSocketServer);
  const config: ConfigService = container.resolve<ConfigService>(ConfigService);

  server.on('request', requestHandler(container));
  wss.on('connection', (ws) => {
    ws.on('message', messageHandler(ws, container));
  });

  server.listen(config.get('httpPort'), () => console.log(`Listening on ${config.get('httpPort')}`));
};
