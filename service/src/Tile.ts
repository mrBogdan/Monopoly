import { TileAction } from './TileAction';

export interface Tile {
  id: string;
  order: number;
  monopolyGroup: string | undefined;
  name: string;
  icon: string;
  action: TileAction;
  isPurchasable(): boolean;
  isUpgradable(): boolean;
}
