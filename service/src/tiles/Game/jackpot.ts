import { GameTile } from '../../tile/GameTile';
import { TileActions } from '../../tile/TileAction';
import { TileType } from '../../tile/TileType';

export const jackpot: GameTile = {
    id: 'jackpot',
    name: 'Jackpot',
    iconUrl: 'jackpot.svg',
    onLandAction: TileActions.Jackpot,
    description: 'jackpot description',
    type: TileType.Game,
}
