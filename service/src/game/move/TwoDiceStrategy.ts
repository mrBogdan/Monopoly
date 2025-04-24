import { Dice } from '../Dice';

import { MoveStrategy } from './MoveStrategy';
import { createTwoDiceStrategyOutcome, TwoDiceStrategyOutcome } from './TwoDiceStrategyOutcome';

export class TwoDiceStrategy implements MoveStrategy {
  constructor(private readonly dice: Dice) {
  }

  moveOutcome(): TwoDiceStrategyOutcome {
    const first = this.dice.roll();
    const second = this.dice.roll();
    return createTwoDiceStrategyOutcome(first, second);
  }
}
