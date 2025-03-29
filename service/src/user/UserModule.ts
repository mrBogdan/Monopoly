import { Module } from '../decorators/Module';
import { UserPublicController } from './UserPublicController';
import { UserService } from './UserService';
import { IdGenerator } from '../idGenerator/IdGenerator';
import { Hasher } from '../hasher/Hasher';
import { POSTGRES_USER_REPOSITORY } from './PostgresUserRepository';

@Module({
  controllers: [UserPublicController],
  services: [UserService, IdGenerator, Hasher, POSTGRES_USER_REPOSITORY],
})
export class UserModule {}
