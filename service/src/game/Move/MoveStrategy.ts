import { MoveOutcome } from './MoveOutcome';

export interface MoveStrategy {
  moveOutcome(): MoveOutcome<unknown>;
}
