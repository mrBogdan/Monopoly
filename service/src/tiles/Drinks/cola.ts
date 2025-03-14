import { MonopolyTile } from '../../tile/MonopolyTile';
import { createMonopolyReward, MonopolyReward } from '../../tile/MonopolyReward';
import { TileType } from '../../tile/TileType';
import { Monopoly } from '../../tile/Monopoly';

export const cola: MonopolyTile<MonopolyReward> = {
    id: 'cola',
    name: 'Coca Cola',
    description: 'Coca Cola description',
    type: TileType.Monopoly,
    monopoly: Monopoly.Drinks,
    iconUrl: 'cola.svg',
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
