import { Module } from '../decorators';

import { WsRouter } from './WsRouter';

@Module({
  services: [WsRouter]
})
export class WebSocketServerModule {}
