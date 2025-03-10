import { GameTile } from '../../tile/GameTile';
import { TileActions } from '../../tile/TileAction';
import { TileType } from '../../tile/TileType';

export const jail: GameTile = {
  id: 'Jail',
  name: 'Jail',
  iconUrl: 'jail.svg',
  onLandAction: TileActions.OutOfJail,
  description: 'Jail',
  type: TileType.Game,
};
