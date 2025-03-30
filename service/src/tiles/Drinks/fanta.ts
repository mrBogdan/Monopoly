import { MonopolyTile } from '../../tile/MonopolyTile';
import { createMonopolyReward, MonopolyReward } from '../../tile/MonopolyReward';
import { TileType } from '../../tile/TileType';
import { Monopoly } from '../../tile/Monopoly';

export const fanta: MonopolyTile<MonopolyReward> = {
    id: 'fanta',
    name: 'Fanta',
    description: 'Fanta description',
    type: TileType.Monopoly,
    monopoly: Monopoly.Drinks,
    iconUrl: 'fanta.svg',
    mortgageCost: 1000,
    unmortgageCost: 1200,
    cost: 2000,
    reward: createMonopolyReward(
        160,
        800,
        2200,
        6000,
        8000,
        1000,
    ),
};
