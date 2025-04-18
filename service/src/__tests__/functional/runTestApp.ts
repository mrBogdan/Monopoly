import { Application } from '../../Application';
import { ConfigService } from '../../config/ConfigService';
import { Constructor, Container } from '../../di';
import { HttpServerModule } from '../../http';
import { runServer } from '../../runServer';
import { Secure } from '../../secure';
import { WebSocketServerModule } from '../../wss';
import { getAnonymousModule } from '../getAnonymousModule';

const SharedModules = [HttpServerModule, WebSocketServerModule];

export const runTestApp = async (modules: Constructor[]): Promise<Application> => {
  const app = new Application(new Container(), [...modules, ...SharedModules, getAnonymousModule(undefined, [ConfigService, Secure])]);

  await app.run(runServer);

  return app;
};
