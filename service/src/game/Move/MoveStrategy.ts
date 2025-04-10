import { MoveOutcome } from './MoveOutcome';

export interface MoveStrategy {
  moveOutcome<T>(): MoveOutcome<T>;
}
