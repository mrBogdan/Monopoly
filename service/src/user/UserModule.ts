import { Module } from '../decorators';
import { Hasher } from '../hasher/Hasher';

import { POSTGRES_USER_REPOSITORY } from './PostgresUserRepository';
import { UserPublicController } from './UserPublicController';
import { UserService } from './UserService';

@Module({
  controllers: [UserPublicController],
  services: [UserService, Hasher, POSTGRES_USER_REPOSITORY],
})
export class UserModule {}
