import { Dice } from '../Dice';
import { createTwoDiceStrategyOutcome, TwoDiceStrategyOutcome } from './TwoDiceStrategyOutcome';
import { MoveStrategy } from './MoveStrategy';
import { MoveOutcome } from './MoveOutcome';

export class TwoDiceStrategy implements MoveStrategy {
  constructor(private readonly dice: Dice) {
  }

  moveOutcome(): MoveOutcome<TwoDiceStrategyOutcome> {
    const first = this.dice.roll();
    const second = this.dice.roll();
    return createTwoDiceStrategyOutcome(first, second);
  }
}
