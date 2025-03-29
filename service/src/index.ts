import { getHttpServer } from './http/getHttpServer';
import { getConfig } from './nodejs/getConfig';
import { AppModule } from './AppModule';
import { getGlobalContainer } from './di/globalContainer';
import { Application } from './Application';
import { Router } from './http/router/Router';
import { isProduction } from './nodejs/getEnv';

if (isProduction()) {
  const application = new Application(
    getGlobalContainer(),
    new Router(),
    AppModule,
    getConfig(),
  );

  process.on('uncaughtException', console.error);

  application.run(getHttpServer);
}
