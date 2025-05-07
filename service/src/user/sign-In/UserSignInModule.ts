import {ConfigService, getConfigValue} from '../../config/ConfigService';
import { Module } from '../../decorators';
import {Hasher} from '../../hasher/Hasher';
import {JwtTokenService} from '../../jwtToken/JwtTokenService';
import {getConfig} from '../../nodejs';
import { POSTGRES_USER_REPOSITORY } from '../PostgresUserRepository';

import { UserSignInController } from './UserSignInController';
import {UserSignInService} from './UserSignInService';

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
