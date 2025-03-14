import { createMonopolyReward, MonopolyReward } from '../../tile/MonopolyReward';
import { TileType } from '../../tile/TileType';
import { Monopoly } from '../../tile/Monopoly';
import { UpgradableMonopolyTile } from '../../tile/UpgradableMonopolyTile';

export const apple: UpgradableMonopolyTile = {
    id: 'apple',
    name: 'Apple',
    description: 'Apple description',
    iconUrl: 'apple.svg',
    monopoly: Monopoly.Electronics,
    type: TileType.Monopoly,
    cost: 3500,
    upgradeCost: 2000,
    mortgageCost: 1750,
    unmortgageCost: 2100,
    reward: createMonopolyReward(
        350,
        1750,
        5000,
        11000,
        13000,
        15000,
    ),
}
