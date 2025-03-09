import { TileType } from '../../tile/TileType';
import { UpgradableMonopolyTile } from '../../tile/UpgradableMonopolyTile';
import { Monopoly } from '../../tile/Monopoly';
import { RewardType } from '../../tile/RewardType';

export const boss: UpgradableMonopolyTile = {
  id: 'Boss',
  name: 'Boss',
  iconUrl: 'boss.svg',
  type: TileType.Monopoly,
  monopoly: Monopoly.Perfumeries,
  description: 'Boss',
  cost: 600,
  upgradeCost: 500,
  mortgageCost: 300,
  unmortgageCost: 360,
  reward: {
    type: RewardType.MonopolyReward,
    rent: 40,
    upgradeRent: {
      level1Rent: 200,
      level2Rent: 600,
      level3Rent: 1800,
      level4Rent: 3200,
      level5Rent: 4500,
    }
  }
}
