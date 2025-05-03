import { GameTile } from '../../tile/GameTile';
import { TileActions } from '../../tile/TileAction';
import { TileType } from '../../tile/TileType';


export const luxuryTax: GameTile = {
  id: 'LuxuryTax',
  name: 'LuxuryTax',
  iconUrl: 'luxuryTax.svg',
  onLandAction: TileActions.PayTax,
  description: 'LuxuryTax',
  type: TileType.Game,
}
