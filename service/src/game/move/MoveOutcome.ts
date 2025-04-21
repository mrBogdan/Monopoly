import { MoveStrategyOutcomeDTO } from './MoveStrategyOutcomeDTO';

export interface MoveOutcome<T> {
  toDTO(): MoveStrategyOutcomeDTO<T>;
}
