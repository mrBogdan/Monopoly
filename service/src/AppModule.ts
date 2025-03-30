import { HealthModule } from './health/HealthModule';
import { UserModule } from './user/UserModule';
import { SharedModule } from './SharedModule';

export const AppModule = [
  HealthModule,
  UserModule,
  SharedModule,
]
