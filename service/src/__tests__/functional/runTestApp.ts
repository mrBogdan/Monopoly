import { Server } from 'node:http';
import { WebSocketServer } from 'ws';

import { Constructor, Container } from '../../di';
import { ConfigService } from '../../config/ConfigService';
import { messageHandler, injectWebSocketServer, WebSocketServerModule } from '../../wss';
import { requestHandler, HttpServerModule } from '../../http';
import { Application } from '../../Application';
import { getAnonymousModule } from '../getAnonymousModule';

const SharedModules = [HttpServerModule, WebSocketServerModule];

export const runTestApp = async (modules: Constructor[]): Promise<Application> => {
  const app = new Application(new Container(), [...modules, ...SharedModules, getAnonymousModule(undefined, [ConfigService])]);

  await app.run(async (container) => {
    const server = container.resolve<Server>(Server);
    const config: ConfigService = container.resolve<ConfigService>(ConfigService);
    const wss = container.resolve<WebSocketServer>(WebSocketServer);
    injectWebSocketServer(server, wss);

    server.on('request', requestHandler(container));

    wss.on('connection', ws => {
      ws.on('message', messageHandler(ws, container));
    });

    server.listen(config.get('httpPort'), () => console.log(`Listening on ${config.get('httpPort')}`));
  });


  return app;
};
