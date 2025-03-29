import { Module } from '../decorators/Module';
import { UserPublicController } from './UserPublicController';
import { UserService } from './UserService';

@Module({
  controllers: [UserPublicController],
  services: [UserService],
})
export class UserModule {}
