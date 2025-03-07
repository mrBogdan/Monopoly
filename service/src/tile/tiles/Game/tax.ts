import { GameTile } from '../../GameTile';
import { TileActions } from '../../TileAction';
import { TileType } from '../../TileType';

export const tax: GameTile = {
  id: 'Tax',
  name: 'Tax',
  iconUrl: 'tax.svg',
  onLandAction: TileActions.PayTax,
  description: 'Tax',
  type: TileType.Game,
}
