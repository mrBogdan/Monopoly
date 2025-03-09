import { GameTile } from '../../GameTile';
import { TileActions } from '../../TileAction';
import { TileType } from '../../TileType';

export const parking: GameTile = {
  id: 'Parking',
  name: 'Parking',
  onLandAction: TileActions.Chill,
  description: 'Parking',
  type: TileType.Game,
  iconUrl: 'parking.svg',
};
