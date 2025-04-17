import { Monopoly } from '../../tile/Monopoly';
import { MonopolyTile } from '../../tile/MonopolyTile';
import { createQuadMonopolyReward, QuadMonopolyReward } from '../../tile/QuadMonopolyReward';
import { TileType } from '../../tile/TileType';

export const mercedes: MonopolyTile<QuadMonopolyReward> = {
    id: 'mercedes',
    name: 'Mercedes',
    description: 'Mercedes description',
    iconUrl: 'mercedes.svg',
    cost: 2000,
    monopoly: Monopoly.Cars,
    mortgageCost: 1000,
    unmortgageCost: 1200,
    type: TileType.Monopoly,
    reward: createQuadMonopolyReward(),
};
