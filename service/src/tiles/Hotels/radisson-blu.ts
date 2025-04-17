import { Monopoly } from '../../tile/Monopoly';
import { createMonopolyReward, MonopolyReward } from '../../tile/MonopolyReward';
import { MonopolyTile } from '../../tile/MonopolyTile';
import { TileType } from '../../tile/TileType';

export const radissonBlu: MonopolyTile<MonopolyReward> = {
    id: 'radisson-blue',
    name: 'Radisson Blu',
    description: 'Radisson Blue description',
    iconUrl: 'radisson-blu.svg',
    monopoly: Monopoly.Hotels,
    type: TileType.Monopoly,
    cost: 3000,
    mortgageCost: 1500,
    unmortgageCost: 1800,
    reward: createMonopolyReward(
        260,
        1300,
        3900,
        9000,
        11000,
        12750,
    )
};
