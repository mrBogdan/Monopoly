import { Module } from '../../decorators';

import { MEMORY_MAP_STATE_REPOSITORY } from './MemoryMapStateRepository';

@Module({
  services: [MEMORY_MAP_STATE_REPOSITORY]
})
export class MapStateModule {}
