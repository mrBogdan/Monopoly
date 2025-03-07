import { RewardType } from './RewardType';

export interface Reward<T> {
  type: RewardType;
  value: T;
}
