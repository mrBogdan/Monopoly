import { Game } from './Game';

export const GAME_REPOSITORY = Symbol('GAME_REPOSITORY');

export interface GameRepository {
  findRequiredGameById(gameId: string): Promise<Game>;
  create(game: Game): Promise<Game>;
}
