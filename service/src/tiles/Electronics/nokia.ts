import { createMonopolyReward } from '../../tile/MonopolyReward';
import { TileType } from '../../tile/TileType';
import { Monopoly } from '../../tile/Monopoly';
import { UpgradableMonopolyTile } from '../../tile/UpgradableMonopolyTile';

export const nokia: UpgradableMonopolyTile = {
    id: 'nokia',
    name: 'Nokia',
    description: 'Nokia description',
    iconUrl: 'nokia.svg',
    monopoly: Monopoly.Electronics,
    type: TileType.Monopoly,
    cost: 4000,
    upgradeCost: 2000,
    mortgageCost: 2000,
    unmortgageCost: 2400,
    reward: createMonopolyReward(
        500,
        2000,
        6000,
        14000,
        17000,
        20000,
    ),
}
