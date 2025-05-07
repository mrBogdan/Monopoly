import { Server } from 'node:http';

import { ConfigService } from './config/ConfigService';
import { Container } from './di';
import { RequestHandler, Router } from './http';
import { JwtRouteSecurity } from './security/JwtRouteSecurity';
import { getWebSocketServer } from './wss/getWebSocketServer';

export const runServer = async (container: Container) => {
  const server = container.resolve<Server>(Server);
  const config: ConfigService = container.resolve<ConfigService>(ConfigService);
  const router: Router = container.resolve<Router>(Router);
  const routeSecurity: JwtRouteSecurity = container.resolve<JwtRouteSecurity>(JwtRouteSecurity);
  getWebSocketServer(container);

  const requestHandler = new RequestHandler(router, container, routeSecurity);

  server.on('request', (req, res) => requestHandler.handle(req, res));

  server.listen(config.get('httpPort'), () => console.log(`Listening on ${config.get('httpPort')}`));
};
