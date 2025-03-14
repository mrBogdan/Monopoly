import { createMonopolyReward, MonopolyReward } from '../../tile/MonopolyReward';
import { MonopolyTile } from '../../tile/MonopolyTile';
import { Monopoly } from '../../tile/Monopoly';
import { TileType } from '../../tile/TileType';

export const holidayInn: MonopolyTile<MonopolyReward> = {
    id: 'holiday-inn',
    name: 'Holiday Inn',
    description: 'Holiday Inn description',
    iconUrl: 'holiday-inn.svg',
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
