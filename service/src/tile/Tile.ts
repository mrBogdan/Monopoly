import { TileAction } from './TileAction';

export interface Tile {
  id: string;
  order: number;
  group: string;
  name: string;
  icon: string;
  action: TileAction;
  isPurchasable(): boolean;
  isUpgradable(): boolean;
}
