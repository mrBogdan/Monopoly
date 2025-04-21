import { MoveStrategyType } from './MoveStrategyType';

export interface MoveStrategyOutcomeDTO<T> {
  strategy: MoveStrategyType;
  outcome: T;
}
