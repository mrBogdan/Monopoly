import { MonopolyTile } from '../../MonopolyTile';
import { DuoMonopolyReward } from '../../DuoMonopolyReward';
import { Monopoly } from '../../Monopoly';
import { RewardType } from '../../RewardType';
import { TileType } from '../../TileType';

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
