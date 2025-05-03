import { UserSignUpModule } from './user/UserSignUpModule';
import { UserSignInModule } from "./user/UserSignInModule";
import { ConfigModule } from './config/ConfigModule';
import { HealthModule } from './health/HealthModule';
import { HttpServerModule } from './http/HttpServerModule';
import { MigrationModule } from './migrations/MigrationModule';
import { SharedModule } from './SharedModule';
import { WebSocketServerModule } from './wss/WebSocketServerModule';
import { SecurityModule } from "./security/SecurityModule";

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
