import { Tile } from './Tile';
import { TileActions } from './TileAction';

export interface GameTile extends Tile {
  onLandAction: TileActions;
}
