import { Game } from './Game';

export const GAME_REPOSITORY = Symbol('GAME_REPOSITORY');

export interface GameRepository {
  getGameById(gameId: string): Promise<Game>;
  create(game: Game): Promise<Game>;
  deleteGame(gameId: string): Promise<void>;
}
