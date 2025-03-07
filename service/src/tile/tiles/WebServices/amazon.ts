import { UpgradableMonopolyTile } from '../../UpgradableMonopolyTile';
import { TileType } from '../../TileType';
import { RewardType } from '../../RewardType';
import { Monopoly } from '../../Monopoly';

export const amazon: UpgradableMonopolyTile = {
  id: 'amazon',
  name: 'Amazon',
  description: 'Amazon',
  mortgageCost: 700,
  unmortgageCost: 840,
  upgradeCost: 750,
  iconUrl: 'amazon.svg',
  type: TileType.Monopoly,
  cost: 1400,
  monopoly: Monopoly.WebServices,
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
