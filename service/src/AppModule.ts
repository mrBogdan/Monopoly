import { HealthModule } from './health/HealthModule';
import { UserModule } from './user/UserModule';
import { SharedModule } from './SharedModule';
import { ConfigModule } from './config/ConfigModule';
import { MigrationModule } from './migrations/MigrationModule';
import { HttpServerModule } from './http';
import { WebSocketServerModule } from './wss';
import { TileModule } from './tile/TileModule';

export const AppModule = [
  HealthModule,
  UserModule,
  SharedModule,
  ConfigModule,
  MigrationModule,
  HttpServerModule,
  WebSocketServerModule,
  TileModule,
]
