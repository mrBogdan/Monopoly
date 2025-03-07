import { TileAction } from './TileAction';
import { TileType } from './TileType';

export interface Tile {
  id: string;
  name: string;
  type: TileType;
  description: string;
  iconUrl: string;
  onLandAction: TileAction;
}
