import { Inject, Injectable } from '../di';

import { MapTile } from './MapTile';
import { TILE_REPOSITORY, TileRepository } from './TileRepository';

@Injectable()
export class TileService {
  constructor(@Inject(TILE_REPOSITORY) private readonly tileRepository: TileRepository) {}

  getTiles(): Promise<MapTile[]> {
    return this.tileRepository.getTiles();
  }
}
