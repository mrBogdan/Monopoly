import { Module } from '../decorators/Module';
import { TilePublicController } from './TilePublicController';
import { TileService } from './TileService';
import { TILE_REPOSITORY } from './TileRepository';
import { MemoryTileRepository } from './MemoryTileRepository';

@Module({
  controllers: [TilePublicController],
  services: [TileService, {
    param: TILE_REPOSITORY,
    useClass: MemoryTileRepository,
  }]
})
export class TileModule {}
