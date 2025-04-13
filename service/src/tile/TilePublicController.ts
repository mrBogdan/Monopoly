import { Controller } from '../decorators';
import { TileService } from './TileService';
import { Get } from '../http';
import { MapTile } from './MapTile';

@Controller('public/tile')
export class TilePublicController {
  constructor(private readonly tileService: TileService) {}

  @Get('list')
  async getTiles(): Promise<MapTile[]> {
    return this.tileService.getTiles();
  }
}
