import { UpgradableMonopolyTile } from '../../tile/UpgradableMonopolyTile';
import { TileType } from '../../tile/TileType';
import { Monopoly } from '../../tile/Monopoly';
import { createMonopolyReward } from '../../tile/MonopolyReward';

export const americanAirlines: UpgradableMonopolyTile = {
    id: 'american-airlines',
    name: 'American Airlines',
    description: 'American Airlines description',
    cost: 2200,
    upgradeCost: 1250,
    iconUrl: 'american-airlines.svg',
    type: TileType.Monopoly,
    monopoly: Monopoly.AirLines,
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
