import { createDuoMonopolyReward, DuoMonopolyReward } from '../../tile/DuoMonopolyReward';
import { Monopoly } from '../../tile/Monopoly';
import { MonopolyTile } from '../../tile/MonopolyTile';
import { TileType } from '../../tile/TileType';

export const rockstar: MonopolyTile<DuoMonopolyReward> = {
  id: 'rockstar',
  name: 'Rockstar',
  description: 'Rockstar description',
  monopoly: Monopoly.VideoGames,
  mortgageCost: 750,
  unmortgageCost: 900,
  cost: 1500,
  iconUrl: 'rockstar.svg',
  type: TileType.Monopoly,
  reward: createDuoMonopolyReward(),
}
