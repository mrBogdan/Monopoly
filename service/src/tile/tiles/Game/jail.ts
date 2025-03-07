import { GameTile } from '../../GameTile';
import { TileActions } from '../../TileAction';
import { TileType } from '../../TileType';

export const jail: GameTile = {
  id: 'Jail',
  name: 'Jail',
  iconUrl: 'jail.svg',
  onLandAction: TileActions.OutOfJail,
  description: 'Jail',
  type: TileType.Game,
};
