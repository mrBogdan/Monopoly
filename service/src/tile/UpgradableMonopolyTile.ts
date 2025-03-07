import { MonopolyTile } from './MonopolyTile';
import { MonopolyReward } from './MonopolyReward';

export interface UpgradableMonopolyTile extends MonopolyTile<MonopolyReward> {
  upgradeCost: number;
}
