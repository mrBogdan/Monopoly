import { ConfigModule } from './config/ConfigModule';
import { HealthModule } from './health/HealthModule';
import { HttpServerModule } from './http/HttpServerModule';
import { MigrationModule } from './migrations/MigrationModule';
import { SecurityModule } from './security/SecurityModule';
import { SharedModule } from './SharedModule';
import { UserSignInModule } from './user/UserSignInModule';
import { UserSignUpModule } from './user/UserSignUpModule';
import { WebSocketServerModule } from './wss/WebSocketServerModule';

export const AppModule = [
  HealthModule,
  SecurityModule,
  UserSignUpModule,
  UserSignInModule,
  SharedModule,
  ConfigModule,
  MigrationModule,
  HttpServerModule,
  WebSocketServerModule,
]
