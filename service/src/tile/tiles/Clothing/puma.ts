import { UpgradableMonopolyTile } from '../../UpgradableMonopolyTile';
import { RewardType } from '../../RewardType';
import { Monopoly } from '../../Monopoly';
import { TileType } from '../../TileType';

export const puma: UpgradableMonopolyTile = {
  id: 'Puma',
  name: 'Puma',
  description: 'Puma description',
  iconUrl: 'puma.svg',
  upgradeCost: 500,
  mortgageCost: 500,
  unmortgageCost: 600,
  monopoly: Monopoly.Clothing,
  type: TileType.Monopoly,
  cost: 1000,
  reward: {
    type: RewardType.MonopolyReward,
    rent: 60,
    upgradeRent: {
      level1Rent: 300,
      level2Rent: 900,
      level3Rent: 2700,
      level4Rent: 4000,
      level5Rent: 5500,
    },
  },
};
