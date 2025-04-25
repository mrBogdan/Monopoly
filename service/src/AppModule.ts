import { ConfigModule } from './config/ConfigModule';
import { GameModule } from './game/GameModule';
import { HealthModule } from './health/HealthModule';
import { HttpServerModule } from './http';
import { MigrationModule } from './migrations/MigrationModule';
import { SharedModule } from './SharedModule';
import { TileModule } from './tile/TileModule';
import { UserModule } from './user';
import { RoomModule, UserSocketModule, WebSocketServerModule } from './wss';

export const AppModule = [
  HealthModule,
  UserModule,
  SharedModule,
  ConfigModule,
  MigrationModule,
  HttpServerModule,
  WebSocketServerModule,
  TileModule,
  UserSocketModule,
  RoomModule,
  GameModule,
];
