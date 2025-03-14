import { Reward } from './Reward';
import { RewardType } from './RewardType';

export interface QuadMonopolyReward {
    level1Rent: number;
    level2Rent: number;
    level3Rent: number;
    level4Rent: number;
}

export const createQuadMonopolyReward = (
    rent: number = 100,
    level1Rent: number = 250,
    level2Rent: number = 500,
    level3Rent: number = 1000,
    level4Rent: number = 2000,
): Reward<QuadMonopolyReward> => {
    return {
        rent,
        type: RewardType.QuadMonopolyReward,
        upgradeRent: {
            level1Rent,
            level2Rent,
            level3Rent,
            level4Rent,
        },
    };
};
