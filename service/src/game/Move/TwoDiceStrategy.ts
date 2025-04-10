import { Dice } from '../Dice';
import { createTwoDiceStrategyOutcome, TwoDiceStrategyOutcome } from './TwoDiceStrategyOutcome';
import { MoveStrategy } from './MoveStrategy';

class TwoDiceStrategy implements MoveStrategy {
  constructor(private readonly dice: Dice) {
  }

  moveOutcome(): TwoDiceStrategyOutcome {
    const first = this.dice.roll();
    const second = this.dice.roll();
    return createTwoDiceStrategyOutcome(first, second);
  }
}
