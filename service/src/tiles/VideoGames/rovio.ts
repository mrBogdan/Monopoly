import { MonopolyTile } from '../../tile/MonopolyTile';
import { createDuoMonopolyReward, DuoMonopolyReward } from '../../tile/DuoMonopolyReward';
import { Monopoly } from '../../tile/Monopoly';
import { TileType } from '../../tile/TileType';

export const rovio: MonopolyTile<DuoMonopolyReward> = {
  id: 'rovio',
  name: 'Rovio',
  description: 'Rovio description',
  monopoly: Monopoly.VideoGames,
  mortgageCost: 750,
  unmortgageCost: 900,
  cost: 1500,
  iconUrl: 'rovio.svg',
  type: TileType.Monopoly,
  reward: createDuoMonopolyReward(),
}
