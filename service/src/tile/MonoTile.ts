import { Tile } from './Tile';
import { Reward } from './Reward';

export interface MonoTile<T> extends Tile {
  reward: Reward<T>;
  cost: number;
  mortgageCost: number;
  unmortgageCost: number;
  monopoly: string;
}
