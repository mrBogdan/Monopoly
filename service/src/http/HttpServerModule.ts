
import { Server } from 'node:http';

import { Module } from '../decorators/Module';

import { getHttpServer } from './getHttpServer';
import { Router } from './router/Router';


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
