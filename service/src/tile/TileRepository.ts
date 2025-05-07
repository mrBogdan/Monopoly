import { MapTile } from './MapTile';

export const TILE_REPOSITORY = Symbol('TILE_REPOSITORY');

export interface TileRepository {
  getTiles(): Promise<MapTile[]>;
}
