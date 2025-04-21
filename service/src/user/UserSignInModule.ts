import { Module } from '../decorators/Module';
import { UserSignInController } from './SignInFeature/UserSignInController';
import {UserSignInService} from "./SignInFeature/UserSignInService";
import {JwtTokenService} from "../jwtToken/jwtTokenService";
import {Hasher} from '../hasher/Hasher';
import { POSTGRES_USER_REPOSITORY } from './PostgresUserRepository';

@Module({
  controllers: [UserSignInController],
  services: [UserSignInService, JwtTokenService, Hasher, POSTGRES_USER_REPOSITORY],
})
export class UserSignInModule {}
