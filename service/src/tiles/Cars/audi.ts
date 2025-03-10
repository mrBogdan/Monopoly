import { MonopolyTile } from '../../tile/MonopolyTile';
import { QuadMonopolyReward } from '../../tile/QuadMonopolyReward';
import { Monopoly } from '../../tile/Monopoly';
import { TileType } from '../../tile/TileType';
import { RewardType } from '../../tile/RewardType';

export const audi: MonopolyTile<QuadMonopolyReward> = {
  id: 'audi',
  name: 'Audi',
  description: 'Audi description',
  iconUrl: 'adidas.svg',
  cost: 2000,
  monopoly: Monopoly.Cars,
  mortgageCost: 1000,
  unmortgageCost: 1200,
  type: TileType.Monopoly,
  reward: {
    type: RewardType.QuadMonopolyReward,
    rent: 250,
    upgradeRent: {
      level1Rent: 250,
      level2Rent: 500,
      level3Rent: 1000,
      level4Rent: 2000,
    }
  }
}
