import { Controller } from '../decorators';
import { Get } from '../http';

import { MapTile } from './MapTile';
import { TileService } from './TileService';

@Controller('public/tile')
export class TilePublicController {
  constructor(private readonly tileService: TileService) {}

  @Get('list')
  async getTiles(): Promise<MapTile[]> {
    return this.tileService.getTiles();
  }
}
