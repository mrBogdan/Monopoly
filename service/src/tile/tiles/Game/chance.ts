import { GameTile } from '../../GameTile';
import { TileActions } from '../../TileAction';
import { TileType } from '../../TileType';

export const chance: GameTile = {
  id: 'Chance',
  name: 'Chance',
  iconUrl: 'chance.svg',
  onLandAction: TileActions.RollChance,
  description: 'Chance',
  type: TileType.Game,
};
