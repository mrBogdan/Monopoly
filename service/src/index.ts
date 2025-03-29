import { getHttpServer } from './http/getHttpServer';
import { getConfig } from './nodejs/getConfig';
import { AppModule } from './AppModule';
import { getGlobalContainer } from './di/globalContainer';
import { Application } from './Application';
import { Router } from './http/router/Router';

if (process.env.NODE_ENV === 'production') {
  const application = new Application(
    getGlobalContainer(),
    new Router(),
    AppModule,
    getConfig(),
  );

  application.run(getHttpServer);
}

process.on('uncaughtException', console.error);
