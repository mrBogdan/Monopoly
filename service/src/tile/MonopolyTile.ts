import { Monopoly } from './Monopoly';
import { Reward } from './Reward';
import { Tile } from './Tile';

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
