import { Module } from '../decorators/Module';

import { MemoryTileRepository } from './MemoryTileRepository';
import { TilePublicController } from './TilePublicController';
import { TILE_REPOSITORY } from './TileRepository';
import { TileService } from './TileService';

@Module({
  controllers: [TilePublicController],
  services: [TileService, {
    param: TILE_REPOSITORY,
    useClass: MemoryTileRepository,
  }]
})
export class TileModule {}
