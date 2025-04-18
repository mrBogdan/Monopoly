import { Game } from '../Game';

import { MoveStrategy } from './MoveStrategy';

export interface MoveStrategyFactory {
  createMoveStrategy(game: Game): MoveStrategy;
}
