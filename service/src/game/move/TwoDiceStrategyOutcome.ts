import { MoveOutcome } from './MoveOutcome';
import { MoveStrategyOutcomeDTO } from './MoveStrategyOutcomeDTO';
import { MoveStrategyType } from './MoveStrategyType';
import { TwoDiceOutcome } from './TwoDiceOutcome';

export class TwoDiceStrategyOutcome implements MoveOutcome<TwoDiceOutcome> {
  constructor(
    private first: number,
    private second: number
  ) {}

  toDTO(): MoveStrategyOutcomeDTO<TwoDiceOutcome> {
    return {
      strategy: MoveStrategyType.TWO_DICE,
      outcome: {
        first: this.first,
        second: this.second,
      }
    }
  }
}

export const createTwoDiceStrategyOutcome = (first: number, second: number): TwoDiceStrategyOutcome =>
  new TwoDiceStrategyOutcome(first, second);
