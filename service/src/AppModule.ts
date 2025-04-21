import { HealthModule } from './health/HealthModule';
import { UserSignUpModule } from './user/UserSignUpModule';
import { UserSignInModule } from "./user/UserSignInModule";
import { SharedModule } from './SharedModule';
import { ConfigModule } from './config/ConfigModule';
import { MigrationModule } from './migrations/MigrationModule';
import { HttpServerModule } from './http/HttpServerModule';
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
