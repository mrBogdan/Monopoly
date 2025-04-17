import { Monopoly } from '../../tile/Monopoly';
import { createMonopolyReward, MonopolyReward } from '../../tile/MonopolyReward';
import { MonopolyTile } from '../../tile/MonopolyTile';
import { TileType } from '../../tile/TileType';

export const kfc: MonopolyTile<MonopolyReward> = {
    id: 'kfc',
    name: 'KFC',
    description: 'KFC description',
    iconUrl: 'kfc.svg',
    cost: 2800,
    monopoly: Monopoly.Restaurants,
    mortgageCost: 1400,
    unmortgageCost: 1680,
    type: TileType.Monopoly,
    reward: createMonopolyReward(
        240,
        1200,
        3600,
        8500,
        10250,
        12000,
    )
};
