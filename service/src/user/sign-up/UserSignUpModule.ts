import { Module } from '../../decorators/Module';
import { Hasher } from '../../hasher/Hasher';
import { IdGenerator } from '../../idGenerator/IdGenerator';
import { POSTGRES_USER_REPOSITORY } from '../PostgresUserRepository';

import { UserSignUpController } from './UserSignUpController';
import { UserSignUpService } from './UserSignUpService';


@Module({
  controllers: [UserSignUpController],
  services: [UserSignUpService, IdGenerator, Hasher, POSTGRES_USER_REPOSITORY],
})
export class UserSignUpModule {}
