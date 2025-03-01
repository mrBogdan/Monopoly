import { Action } from './Action';
import { Reward } from './Reward';

export interface Tile {
  rewards: Reward[];
  id: string;
  order: number;
  group: string;
  getReward()
  getId(): string;
  getOrder(): number;
  getPrice(): number;
  getName(): string;
  getIcon(): string;
  getBaseAction(): Action;
  isPersonal(): boolean;
  isUpgradable(): boolean;
}
