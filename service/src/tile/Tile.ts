import { TileAction } from './TileAction';

export interface Tile {
  id: string;
  name: string;
  type: string;
  description: string;
  iconUrl: string;
  onLandAction: TileAction;
}
