import { Reward } from './Reward';
import { RewardType } from './RewardType';

export interface MonopolyReward {
    level1Rent: number;
    level2Rent: number;
    level3Rent: number;
    level4Rent: number;
    level5Rent: number;
}

export const createMonopolyReward = (
    rent: number,
    level1Rent: number,
    level2Rent: number,
    level3Rent: number,
    level4Rent: number,
    level5Rent: number,
): Reward<MonopolyReward> => ({
    rent,
    type: RewardType.MonopolyReward,
    upgradeRent: {
        level1Rent,
        level2Rent,
        level3Rent,
        level4Rent,
        level5Rent,
    },
});
