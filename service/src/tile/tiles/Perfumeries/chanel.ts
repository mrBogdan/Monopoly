import { UpgradableMonopolyTile } from '../../UpgradableMonopolyTile';
import { TileType } from '../../TileType';
import { Monopoly } from '../../Monopoly';
import { RewardType } from '../../RewardType';

export const chanel: UpgradableMonopolyTile = {
  id: 'Chanel',
  name: 'Chanel',
  type: TileType.Monopoly,
  iconUrl: 'chanel.svg',
  monopoly: Monopoly.Perfumeries,
  description: 'Chanel perfumes',
  cost: 600,
  upgradeCost: 500,
  mortgageCost: 300,
  unmortgageCost: 360,
  reward: {
    type: RewardType.MonopolyReward,
    rent: 20,
    upgradeRent: {
      level1Rent: 100,
      level2Rent: 300,
      level3Rent: 900,
      level4Rent: 1600,
      level5Rent: 2500,
    }
  },
};
