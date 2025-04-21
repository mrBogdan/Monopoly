import { Server } from 'node:http';

import { WebSocketServer } from 'ws';

import { Module } from '../decorators';
import { Secure } from '../secure';

import { getWebSocketServer } from './getWebSocketServer';
import { MemoryUserSocketRepository } from './user-socket';
import { WsRouter } from './WsRouter';

@Module({
  services: [{
    param: WebSocketServer,
    useFactory: getWebSocketServer,
    inject: [Server, Secure, MemoryUserSocketRepository],
  }, {
    param: WsRouter,
    useClass: WsRouter,
  }]
})
export class WebSocketServerModule {}
