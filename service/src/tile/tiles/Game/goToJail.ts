import { GameTile } from '../../GameTile';
import { TileActions } from '../../TileAction';
import { TileType } from '../../TileType';

export const goToJail: GameTile = {
  id: 'GoToJail',
  name: 'GoToJail',
  iconUrl: 'goToJail.svg',
  onLandAction: TileActions.GoToJail,
  description: 'GoToJail',
  type: TileType.Game,
}
