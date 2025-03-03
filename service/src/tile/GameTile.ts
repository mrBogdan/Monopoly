import { Tile } from './Tile';
import { TileAction } from './TileAction';

export class GameTile implements Tile {
  public readonly id: string;
  public readonly order: number;
  public readonly group: string;
  public readonly name: string;
  public readonly icon: string;
  public readonly action: TileAction;

  isPurchasable(): boolean {
    return false;
  }

  isUpgradable(): boolean {
    return false;
  }
}
