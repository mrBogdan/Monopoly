import { Monopoly } from '../../tile/Monopoly';
import { createMonopolyReward, MonopolyReward } from '../../tile/MonopolyReward';
import { MonopolyTile } from '../../tile/MonopolyTile';
import { TileType } from '../../tile/TileType';

export const mcDonalds: MonopolyTile<MonopolyReward> = {
    id: 'mc-donalds',
    name: 'Mc Donald`s',
    description: 'Mc Donalds description',
    iconUrl: 'mc-donalds.svg',
    cost: 2600,
    monopoly: Monopoly.Restaurants,
    mortgageCost: 1300,
    unmortgageCost: 1560,
    type: TileType.Monopoly,
    reward: createMonopolyReward(
        220,
        1100,
        3300,
        8000,
        9750,
        11500,
    )
};
