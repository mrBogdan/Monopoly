import { Inject, Injectable } from '../di';
import { TILE_REPOSITORY, TileRepository } from './TileRepository';
import { MapTile } from './MapTile';

@Injectable()
export class TileService {
  constructor(@Inject(TILE_REPOSITORY) private readonly tileRepository: TileRepository) {}

  getTiles(): Promise<MapTile[]> {
    return this.tileRepository.getTiles();
  }
}
