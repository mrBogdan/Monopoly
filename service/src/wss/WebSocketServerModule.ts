import { WebSocketServer } from 'ws';

import { Module } from '../decorators/Module';
import { getWebSocketServer } from './getWebSocketServer';

@Module({
  services: [{
    param: WebSocketServer,
    useFactory: getWebSocketServer,
  }]
})
export class WebSocketServerModule {}
