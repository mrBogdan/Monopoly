import { GameTile } from '../../tile/GameTile';
import { TileActions } from '../../tile/TileAction';
import { TileType } from '../../tile/TileType';

export const parking: GameTile = {
  id: 'Parking',
  name: 'Parking',
  onLandAction: TileActions.Chill,
  description: 'Parking',
  type: TileType.Game,
  iconUrl: 'parking.svg',
};
