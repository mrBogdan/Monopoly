import { MonopolyTile } from '../../tile/MonopolyTile';
import { createQuadMonopolyReward, QuadMonopolyReward } from '../../tile/QuadMonopolyReward';
import { Monopoly } from '../../tile/Monopoly';
import { TileType } from '../../tile/TileType';

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
  reward: createQuadMonopolyReward(),
}
