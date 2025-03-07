import { TileType } from './TileType';

export interface Tile {
  id: string;
  name: string;
  iconUrl: string;
  description: string;
  type: TileType;
}
