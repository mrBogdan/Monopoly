import { MoveStrategyType } from './MoveStrategyType';
import { MoveOutcome } from './MoveOutcome';
import { MoveStrategyOutcomeDTO } from './MoveStrategyOutcomeDTO';
import { TwoDiceOutcome } from './TwoDiceOutcome';

export class TwoDiceStrategyOutcome implements MoveOutcome {
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
