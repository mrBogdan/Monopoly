import { WebSocketServer } from 'ws';
import { Server } from 'node:http';

import { Module } from '../decorators';
import { getWebSocketServer } from './getWebSocketServer';
import { WsRouter } from './WsRouter';
import { Secure } from '../secure';

@Module({
  services: [{
    param: WebSocketServer,
    useFactory: getWebSocketServer,
    inject: [Server, Secure],
  }, {
    param: WsRouter,
    useClass: WsRouter,
  }]
})
export class WebSocketServerModule {}
