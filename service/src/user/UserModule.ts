import { Module } from '../decorators';

import { UserService } from './UserService';


@Module({
  controllers: [],
  services: [UserService],
})
export class UserModule {}
