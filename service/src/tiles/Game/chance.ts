import { GameTile } from '../../tile/GameTile';
import { TileActions } from '../../tile/TileAction';
import { TileType } from '../../tile/TileType';

export const chance: GameTile = {
  id: 'Chance',
  name: 'Chance',
  iconUrl: 'chance.svg',
  onLandAction: TileActions.RollChance,
  description: 'Chance',
  type: TileType.Game,
};
