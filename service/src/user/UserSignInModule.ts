import { Module } from '../decorators/Module';
import { UserSignInController } from './sign-In/UserSignInController';
import {UserSignInService} from "./sign-In/UserSignInService";
import {JwtTokenService} from "../jwtToken/JwtTokenService";
import {Hasher} from '../hasher/Hasher';
import { POSTGRES_USER_REPOSITORY } from './PostgresUserRepository';
import {ConfigService, getConfigValue} from "../config/ConfigService";
import {getConfig} from "../nodejs/getConfig";

@Module({
  controllers: [UserSignInController],
  services: [
    UserSignInService,
    Hasher,
    POSTGRES_USER_REPOSITORY,
    ConfigService,
    getConfigValue(getConfig()),
    JwtTokenService,
  ],
})
export class UserSignInModule {}
