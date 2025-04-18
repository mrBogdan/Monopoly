import { Injectable } from '../di';
import { mapTiles } from '../tiles/tiles';

import { MapTile } from './MapTile';
import { TileRepository } from './TileRepository';

@Injectable()
export class MemoryTileRepository implements TileRepository {
  constructor() {
  }

  getTiles(): Promise<MapTile[]> {
    return Promise.resolve(mapTiles);
  }
}
