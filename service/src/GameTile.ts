import { Tile } from './Tile';

export class GameTile implements Tile {
  isPurchasable(): boolean {
    return false;
  }

  isUpgradable(): boolean {
    return false;
  }
}
