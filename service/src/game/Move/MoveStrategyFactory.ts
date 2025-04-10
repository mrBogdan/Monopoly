import { MoveStrategy } from './MoveStrategy';
import { Game } from '../Game';

export interface MoveStrategyFactory {
  createMoveStrategy(game: Game): MoveStrategy;
}
