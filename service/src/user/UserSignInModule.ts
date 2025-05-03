import {ConfigService, getConfigValue} from '../config/ConfigService';
import { Module } from '../decorators/Module';
import {Hasher} from '../hasher/Hasher';
import {JwtTokenService} from '../jwtToken/JwtTokenService';
import {getConfig} from '../nodejs/getConfig';

import { POSTGRES_USER_REPOSITORY } from './PostgresUserRepository';
import { UserSignInController } from './sign-In/UserSignInController';
import {UserSignInService} from './sign-In/UserSignInService';



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
