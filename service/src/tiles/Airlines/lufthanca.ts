import { Monopoly } from '../../tile/Monopoly';
import { createMonopolyReward } from '../../tile/MonopolyReward';
import { TileType } from '../../tile/TileType';
import { UpgradableMonopolyTile } from '../../tile/UpgradableMonopolyTile';

export const lufthanca: UpgradableMonopolyTile = {
    id: 'lufthanca',
    name: 'Lufthanca',
    description: 'Lufthansa description',
    cost: 2200,
    upgradeCost: 1250,
    iconUrl: 'lufthanca.svg',
    type: TileType.Monopoly,
    monopoly: Monopoly.Clothing,
    mortgageCost: 1100,
    unmortgageCost: 1320,
    reward: createMonopolyReward(
        180,
        900,
        2500,
        7000,
        8750,
        10500,
    )
};
