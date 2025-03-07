import { UpgradableMonopolyTile } from '../../UpgradableMonopolyTile';
import { Monopoly } from '../../Monopoly';
import { TileType } from '../../TileType';
import { RewardType } from '../../RewardType';

export const lacoste: UpgradableMonopolyTile = {
  id: 'lacoste',
  name: 'Lacoste',
  description: 'Lacoste description',
  iconUrl: 'lacoste.svg',
  cost: 1200,
  monopoly: Monopoly.Clothing,
  type: TileType.Monopoly,
  mortgageCost: 600,
  unmortgageCost: 720,
  upgradeCost: 500,
  reward: {
    type: RewardType.MonopolyReward,
    rent: 80,
    upgradeRent: {
      level1Rent: 400,
      level2Rent: 1000,
      level3Rent: 3000,
      level4Rent: 4500,
      level5Rent: 6000,
    }
  }
}
