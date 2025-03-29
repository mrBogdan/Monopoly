import { Module } from '../decorators/Module';
import { UserPublicController } from './UserPublicController';
import { UserService } from './UserService';
import { IdGenerator } from '../idGenerator/IdGenerator';
import { Hasher } from '../hasher/Hasher';

@Module({
  controllers: [UserPublicController],
  services: [UserService, IdGenerator, Hasher],
})
export class UserModule {}
