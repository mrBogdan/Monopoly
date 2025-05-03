import { MonopolyReward } from './MonopolyReward';
import { MonopolyTile } from './MonopolyTile';

export interface UpgradableMonopolyTile extends MonopolyTile<MonopolyReward> {
  upgradeCost: number;
}
