import { Injectable } from '../../di';
import { Dice } from '../Dice';
import { Game } from '../Game';
import { GameType } from '../GameType';

import { MoveStrategy } from './MoveStrategy';
import { TwoDiceStrategy } from './TwoDiceStrategy';

@Injectable()
export class MoveStrategyFactory {
  constructor(private readonly dice: Dice) {
  }

  createMoveStrategy(game: Game): MoveStrategy {
    const {gameType} = game.settings();

    switch (gameType) {
      case GameType.USUAL: {
        return new TwoDiceStrategy(this.dice);
      }
      default: {
        throw new Error(`Unsupported game type: ${gameType}`);
      }
    }
  }
}
