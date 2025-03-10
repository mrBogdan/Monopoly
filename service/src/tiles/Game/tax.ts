import { GameTile } from '../../tile/GameTile';
import { TileActions } from '../../tile/TileAction';
import { TileType } from '../../tile/TileType';

export const tax: GameTile = {
  id: 'Tax',
  name: 'Tax',
  iconUrl: 'tax.svg',
  onLandAction: TileActions.PayTax,
  description: 'Tax',
  type: TileType.Game,
}
