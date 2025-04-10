import { WebSocketServer } from 'ws';

import { Module } from '../decorators/Module';
import { getWebSocketServer } from './getWebSocketServer';
import { WsRouter } from './WsRouter';

@Module({
  services: [{
    param: WebSocketServer,
    useFactory: getWebSocketServer,
  }, {
    param: WsRouter,
    useClass: WsRouter,
  }]
})
export class WebSocketServerModule {}
