import { Module } from '../decorators/Module';
import { UserSignUpController } from './sign-up/UserSignUpController';
import { UserSignUpService } from './sign-up/UserSignUpService';
import { IdGenerator } from '../idGenerator/IdGenerator';
import { Hasher } from '../hasher/Hasher';
import { POSTGRES_USER_REPOSITORY } from './PostgresUserRepository';

@Module({
  controllers: [UserSignUpController],
  services: [UserSignUpService, IdGenerator, Hasher, POSTGRES_USER_REPOSITORY],
})
export class UserSignUpModule {}
