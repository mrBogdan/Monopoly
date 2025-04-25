import { Server } from 'node:http';

import { ConfigService } from './config/ConfigService';
import { Container } from './di';
import { requestHandler } from './http';
import { getWebSocketServer } from './wss/getWebSocketServer';

export const runServer = async (container: Container) => {
  const server = container.resolve<Server>(Server);
  const config: ConfigService = container.resolve<ConfigService>(ConfigService);
  getWebSocketServer(container);

  server.on('request', requestHandler(container));

  server.listen(config.get('httpPort'), () => console.log(`Listening on ${config.get('httpPort')}`));
};
