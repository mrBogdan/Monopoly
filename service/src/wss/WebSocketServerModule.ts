import { Module } from '../decorators/Module';
import { WebSocketServer } from 'ws';
import { getWebSocketServer } from './getWebSocketServer';

@Module({
  services: [{
    param: WebSocketServer,
    useFactory: getWebSocketServer,
  }]
})
export class WebSocketServerModule {}
