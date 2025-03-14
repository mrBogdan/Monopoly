import { createMonopolyReward, MonopolyReward } from '../../tile/MonopolyReward';
import { MonopolyTile } from '../../tile/MonopolyTile';
import { Monopoly } from '../../tile/Monopoly';
import { TileType } from '../../tile/TileType';

export const novotel: MonopolyTile<MonopolyReward> = {
    id: 'novotel',
    name: 'Novotel',
    description: 'Novotel description',
    iconUrl: 'novotel.svg',
    monopoly: Monopoly.Hotels,
    type: TileType.Monopoly,
    cost: 3200,
    mortgageCost: 1600,
    unmortgageCost: 1920,
    reward: createMonopolyReward(
        280,
        1500,
        4500,
        1000,
        12000,
        14000,
    )
};
