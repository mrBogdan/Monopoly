import { GameTile } from '../../tile/GameTile';
import { GameTiles } from '../../tile/GameTiles';
import { TileActions } from '../../tile/TileAction';
import { TileType } from '../../tile/TileType';

export const start: GameTile = {
  id: GameTiles.Start,
  name: 'Start',
  iconUrl: 'start.svg',
  onLandAction: TileActions.StartBonus,
  description: 'Start',
  type: TileType.Game,
};
