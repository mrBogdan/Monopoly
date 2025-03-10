import { GameTile } from '../../GameTile';
import { TileActions } from '../../TileAction';
import { TileType } from '../../TileType';

export const luxuryTax: GameTile = {
  id: 'LuxuryTax',
  name: 'LuxuryTax',
  iconUrl: 'luxuryTax.svg',
  onLandAction: TileActions.PayTax,
  description: 'LuxuryTax',
  type: TileType.Game,
}
