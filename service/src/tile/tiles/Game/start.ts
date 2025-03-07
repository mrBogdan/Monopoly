import { GameTile } from '../../GameTile';
import { GameTiles } from '../../GameTiles';
import { TileActions } from '../../TileAction';
import { TileType } from '../../TileType';

export const start: GameTile = {
  id: GameTiles.Start,
  name: 'Start',
  iconUrl: 'start.svg',
  onLandAction: TileActions.StartBonus,
  description: 'Start',
  type: TileType.Game,
};
