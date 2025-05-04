import { Server } from 'node:http';

import { WebSocketServer } from 'ws';

import { Application } from '../../Application';
import { ConfigService } from '../../config/ConfigService';
import { Constructor, Container } from '../../di/Container';
import { HttpServerModule } from '../../http/HttpServerModule';
import { RequestHandler } from '../../http/RequestHandler';
import { Router } from '../../http/router/Router';
import {JwtRouteSecurity} from '../../security/JwtRouteSecurity';
import { SecurityModule } from '../../security/SecurityModule';
import { getMessageHandler } from '../../wss/getMessageHandler';
import { injectWebSocketServer } from '../../wss/injectWebSocketServer';
import { WebSocketServerModule } from '../../wss/WebSocketServerModule';
import { getAnonymousModule } from '../getAnonymousModule';


const SharedModules = [HttpServerModule, WebSocketServerModule, SecurityModule]

export const runTestApp = async (modules: Constructor<unknown>[]): Promise<Application> => {
  const app = new Application(new Container(), [...modules, ...SharedModules, getAnonymousModule(undefined, [ConfigService])]);

  await app.init();
  await app.run(async (container) => {
    const server = container.resolve<Server>(Server);
    const router = container.resolve<Router>(Router);
    const config: ConfigService = container.resolve<ConfigService>(ConfigService);
    const wss = container.resolve<WebSocketServer>(WebSocketServer);
    const routeSecurity: JwtRouteSecurity = container.resolve<JwtRouteSecurity>(JwtRouteSecurity);
    injectWebSocketServer(server, wss);

    const requestHandler = new RequestHandler(router, container, routeSecurity);
    server.on('request', (req, res) => requestHandler.handle(req, res));

    wss.on('connection', ws => {
      ws.on('message', getMessageHandler(ws));
    });

    server.listen(config.get('httpPort'), () => console.log(`Listening on ${config.get('httpPort')}`));
  });


  return app;
};
