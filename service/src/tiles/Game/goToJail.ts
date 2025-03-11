import { GameTile } from '../../tile/GameTile';
import { TileActions } from '../../tile/TileAction';
import { TileType } from '../../tile/TileType';


export const goToJail: GameTile = {
  id: 'GoToJail',
  name: 'GoToJail',
  iconUrl: 'goToJail.svg',
  onLandAction: TileActions.GoToJail,
  description: 'GoToJail',
  type: TileType.Game,
}
