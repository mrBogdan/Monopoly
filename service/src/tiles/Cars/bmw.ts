import { MonopolyTile } from '../../tile/MonopolyTile';
import { createQuadMonopolyReward, QuadMonopolyReward } from '../../tile/QuadMonopolyReward';
import { Monopoly } from '../../tile/Monopoly';
import { TileType } from '../../tile/TileType';

export const bmw: MonopolyTile<QuadMonopolyReward> = {
    id: 'bmw',
    name: 'BMW',
    description: 'BMW description',
    iconUrl: 'bmw.svg',
    cost: 2000,
    monopoly: Monopoly.Cars,
    mortgageCost: 1000,
    unmortgageCost: 1200,
    type: TileType.Monopoly,
    reward: createQuadMonopolyReward(),
};
