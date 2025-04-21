import { Server } from 'node:http';
import { WebSocketServer } from 'ws';

import { Container } from './di/Container';
import { Router } from './http/router/Router';
import { ConfigService } from './config/ConfigService';
import { RequestHandler } from './http/requestHandler';
import { getMessageHandler } from './wss/getMessageHandler';
import { injectWebSocketServer } from './wss/injectWebSocketServer';
import { JwtRouteSecurity } from "./security/JwtRouteSecurity";

export const runServer = async (container: Container) => {
  const server = container.resolve<Server>(Server);
  const wss = container.resolve<WebSocketServer>(WebSocketServer);
  const router = container.resolve<Router>(Router);
  const config: ConfigService = container.resolve<ConfigService>(ConfigService);
  const routeSecurity: JwtRouteSecurity = container.resolve<JwtRouteSecurity>(JwtRouteSecurity);
  injectWebSocketServer(server, wss);

  const requestHandler = new RequestHandler(router, container, routeSecurity);

  server.on('request', (req, res) => requestHandler.handle(req, res));

  wss.on('connection', ws => {
    ws.on('message', getMessageHandler(ws));
  });

  server.listen(config.get('httpPort'), () => console.log(`Listening on ${config.get('httpPort')}`));
};
