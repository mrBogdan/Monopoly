import { ConfigModule } from './config/ConfigModule';
import { GameModule } from './game/GameModule';
import { HealthModule } from './health/HealthModule';
import { HttpServerModule } from './http';
import { MigrationModule } from './migrations/MigrationModule';
import { SecurityModule } from './security/SecurityModule';
import { SharedModule } from './SharedModule';
import { TileModule } from './tile/TileModule';
import { UserModule } from './user';
import { UserSignInModule } from './user/sign-In/UserSignInModule';
import { UserSignUpModule } from './user/sign-up/UserSignUpModule';
import { RoomModule, UserSocketModule, WebSocketServerModule } from './wss';

export const AppModule = [
  HealthModule,
  SecurityModule,
  UserModule,
  UserSignUpModule,
  UserSignInModule,
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
