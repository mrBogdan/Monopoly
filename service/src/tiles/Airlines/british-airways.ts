import { UpgradableMonopolyTile } from '../../tile/UpgradableMonopolyTile';
import { TileType } from '../../tile/TileType';
import { Monopoly } from '../../tile/Monopoly';
import { createMonopolyReward } from '../../tile/MonopolyReward';

export const britishAirways: UpgradableMonopolyTile = {
    id: 'british-airways',
    name: 'British Airways',
    description: 'British Airways description',
    cost: 2400,
    upgradeCost: 1250,
    iconUrl: 'british-airways.svg',
    type: TileType.Monopoly,
    monopoly: Monopoly.Clothing,
    mortgageCost: 1200,
    unmortgageCost: 1440,
    reward: createMonopolyReward(
        200,
        1000,
        3000,
        7500,
        9250,
        11000,
    )
};
