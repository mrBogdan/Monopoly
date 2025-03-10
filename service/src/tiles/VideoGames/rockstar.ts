import { MonopolyTile } from '../../tile/MonopolyTile';
import { DuoMonopolyReward } from '../../tile/DuoMonopolyReward';
import { Monopoly } from '../../tile/Monopoly';
import { TileType } from '../../tile/TileType';
import { RewardType } from '../../tile/RewardType';

export const rockstar: MonopolyTile<DuoMonopolyReward> = {
  id: 'rockstar',
  name: 'rockstar',
  description: 'rockstar description',
  monopoly: Monopoly.VideoGames,
  mortgageCost: 750,
  unmortgageCost: 900,
  cost: 1500,
  iconUrl: 'amazon.svg',
  type: TileType.Monopoly,
  reward: {
    type: RewardType.DuoMonopolyReward,
    rent: 100,
    upgradeRent: {
      level1Rent: 100,
      level2Rent: 250,
    }
  }
}
