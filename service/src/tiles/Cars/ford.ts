import { Monopoly } from '../../tile/Monopoly';
import { MonopolyTile } from '../../tile/MonopolyTile';
import { createQuadMonopolyReward, QuadMonopolyReward } from '../../tile/QuadMonopolyReward';
import { TileType } from '../../tile/TileType';

export const ford: MonopolyTile<QuadMonopolyReward> = {
    id: 'ford',
    name: 'Ford',
    description: 'Ford description',
    iconUrl: 'ford.svg',
    cost: 2000,
    monopoly: Monopoly.Cars,
    mortgageCost: 1000,
    unmortgageCost: 1200,
    type: TileType.Monopoly,
    reward: createQuadMonopolyReward(),
};
