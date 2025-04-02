import { HealthModule } from './health/HealthModule';
import { UserModule } from './user/UserModule';
import { SharedModule } from './SharedModule';
import { ConfigModule } from './config/ConfigModule';
import { MigrationModule } from './migrations/MigrationModule';
import { HttpServerModule } from './http/HttpServerModule';
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
