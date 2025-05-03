import { Module } from '../decorators/Module';
import { Hasher } from '../hasher/Hasher';
import { IdGenerator } from '../idGenerator/IdGenerator';

import { POSTGRES_USER_REPOSITORY } from './PostgresUserRepository';
import { UserPublicController } from './UserPublicController';
import { UserService } from './UserService';


@Module({
  controllers: [UserPublicController],
  services: [UserService, IdGenerator, Hasher, POSTGRES_USER_REPOSITORY],
})
export class UserModule {}
