import { RewardType } from './RewardType';

export interface Reward<T> {
  type: RewardType;
  rent: number;
  value: T;
}
