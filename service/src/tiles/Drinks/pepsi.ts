import { MonopolyTile } from '../../tile/MonopolyTile';
import { createMonopolyReward, MonopolyReward } from '../../tile/MonopolyReward';
import { TileType } from '../../tile/TileType';
import { Monopoly } from '../../tile/Monopoly';

export const pepsi: MonopolyTile<MonopolyReward> = {
    id: 'pepse',
    name: 'Pepsi',
    description: 'Pepsi description',
    type: TileType.Monopoly,
    monopoly: Monopoly.Drinks,
    iconUrl: 'pepsi.svg',
    mortgageCost: 900,
    unmortgageCost: 1080,
    cost: 1800,
    reward: createMonopolyReward(
        140,
        700,
        2000,
        5500,
        7500,
        9500,
    ),
};
