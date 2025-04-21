import { Module } from '../decorators/Module';
import { UserSignUpController } from './SignUpFeature/UserSignUpController';
import { UserSignUpService } from './SignUpFeature/UserSignUpService';
import { IdGenerator } from '../idGenerator/IdGenerator';
import { Hasher } from '../hasher/Hasher';
import { POSTGRES_USER_REPOSITORY } from './PostgresUserRepository';

@Module({
  controllers: [UserSignUpController],
  services: [UserSignUpService, IdGenerator, Hasher, POSTGRES_USER_REPOSITORY],
})
export class UserSignUpModule {}
