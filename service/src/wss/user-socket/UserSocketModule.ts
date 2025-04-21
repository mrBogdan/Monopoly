import { Module } from '../../decorators';

import { MemoryUserSocketRepository } from './MemoryUserSocketRepository';

@Module({
  services: [MemoryUserSocketRepository]
})
export class UserSocketModule {}
