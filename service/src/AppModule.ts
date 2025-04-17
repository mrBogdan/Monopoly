import { ConfigModule } from './config/ConfigModule';
import { HealthModule } from './health/HealthModule';
import { HttpServerModule } from './http/HttpServerModule';
import { MigrationModule } from './migrations/MigrationModule';
import { SharedModule } from './SharedModule';
import { UserModule } from './user/UserModule';
import { WebSocketServerModule } from './wss/WebSocketServerModule';

export const AppModule = [
  HealthModule,
  UserModule,
  SharedModule,
  ConfigModule,
  MigrationModule,
  HttpServerModule,
  WebSocketServerModule,
]
