import { TileRepository } from './TileRepository';
import { Injectable } from '../di';
import { MapTile } from './MapTile';
import { mapTiles } from '../tiles/tiles';

@Injectable()
export class MemoryTileRepository implements TileRepository {
  constructor() {
  }

  getTiles(): Promise<MapTile[]> {
    return Promise.resolve(mapTiles);
  }
}
