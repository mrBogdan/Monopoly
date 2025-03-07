import { Tile } from './Tile';
import { Reward } from './Reward';
import { Monopoly } from './Monopoly';

/**
 * Player can
 * Buy it when it's free
 * Pay rent
 * Upgrade it
 * Mortgage
 * Trade it
 */

export interface MonopolyTile<T> extends Tile {
  reward: Reward<T>;
  cost: number;
  mortgageCost: number;
  unmortgageCost: number;
  monopoly: Monopoly;
}
