import { UpgradableMonopolyTile } from '../../UpgradableMonopolyTile';
import { Monopoly } from '../../Monopoly';
import { RewardType } from '../../RewardType';
import { TileType } from '../../TileType';

export const adidas: UpgradableMonopolyTile = {
  id: 'Adidas',
  name: 'Adidas',
  description: 'Adidas',
  cost: 1000,
  upgradeCost: 500,
  iconUrl: 'adidas.svg',
  type: TileType.Monopoly,
  monopoly: Monopoly.Clothing,
  mortgageCost: 500,
  unmortgageCost: 600,
  reward: {
    type: RewardType.MonopolyReward,
    rent: 60,
    upgradeRent: {
      level1Rent: 300,
      level2Rent: 900,
      level3Rent: 2700,
      level4Rent: 4000,
      level5Rent: 5500,
    }
  }
};
