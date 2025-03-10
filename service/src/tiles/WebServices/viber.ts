import { UpgradableMonopolyTile } from '../../tile/UpgradableMonopolyTile';
import { Monopoly } from '../../tile/Monopoly';
import { TileType } from '../../tile/TileType';
import { RewardType } from '../../tile/RewardType';

export const viber: UpgradableMonopolyTile = {
  id: 'Viber',
  name: 'Viber',
  description: 'Viber desc',
  mortgageCost: 700,
  unmortgageCost: 840,
  cost: 1400,
  upgradeCost: 750,
  iconUrl: 'viber.svg',
  monopoly: Monopoly.WebServices,
  type: TileType.Monopoly,
  reward: {
    type: RewardType.MonopolyReward,
    rent: 100,
    upgradeRent: {
      level1Rent: 500,
      level2Rent: 1500,
      level3Rent: 4500,
      level4Rent: 6250,
      level5Rent: 7500,
    }
  }
}
