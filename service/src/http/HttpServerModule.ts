import { Module } from '../decorators/Module';
import { Router } from './router/Router';
import { Server } from 'node:http';
import { getHttpServer } from './getHttpServer';

@Module({
  services: [{
    param: Router,
    useFactory: (): Router => {
      return new Router();
    },
  }, {
    param: Server,
    useFactory: (): Server => {
      return getHttpServer();
    },
  }]
})
export class HttpServerModule {}
