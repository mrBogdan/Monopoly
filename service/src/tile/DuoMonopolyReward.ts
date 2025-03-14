import { Reward } from './Reward';
import { RewardType } from './RewardType';

export interface DuoMonopolyReward {
  level1Rent: number;
  level2Rent: number;
}

export const createDuoMonopolyReward = (rent: number = 100, level1Rent: number = 100, level2Rent: number = 250): Reward<DuoMonopolyReward> => {
  return {
    rent,
    type: RewardType.DuoMonopolyReward,
    upgradeRent: {
        level1Rent,
        level2Rent,
    }
  }
}
