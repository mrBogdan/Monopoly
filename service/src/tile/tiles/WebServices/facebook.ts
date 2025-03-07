import { UpgradableMonopolyTile } from '../../UpgradableMonopolyTile';
import { Monopoly } from '../../Monopoly';
import { RewardType } from '../../RewardType';
import { TileType } from '../../TileType';

export const facebook: UpgradableMonopolyTile = {
  id: 'facebook',
  name: 'Facebook',
  description: 'Facebook desc',
  iconUrl: 'favicon.svg',
  cost: 1600,
  upgradeCost: 750,
  mortgageCost: 800,
  unmortgageCost: 960,
  monopoly: Monopoly.WebServices,
  type: TileType.Monopoly,
  reward: {
    type: RewardType.MonopolyReward,
    rent: 120,
    upgradeRent: {
      level1Rent: 600,
      level2Rent: 1800,
      level3Rent: 5000,
      level4Rent: 7000,
      level5Rent: 9000,
    }
  }
}
