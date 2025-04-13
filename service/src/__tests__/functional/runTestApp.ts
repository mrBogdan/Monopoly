import { Constructor, Container } from '../../di';
import { ConfigService } from '../../config/ConfigService';
import { WebSocketServerModule } from '../../wss';
import { HttpServerModule } from '../../http';
import { Application } from '../../Application';
import { getAnonymousModule } from '../getAnonymousModule';
import { runServer } from '../../runServer';

const SharedModules = [HttpServerModule, WebSocketServerModule];

export const runTestApp = async (modules: Constructor[]): Promise<Application> => {
  const app = new Application(new Container(), [...modules, ...SharedModules, getAnonymousModule(undefined, [ConfigService])]);

  await app.run(runServer);

  return app;
};
