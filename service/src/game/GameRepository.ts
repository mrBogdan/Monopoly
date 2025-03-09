import { Game } from './Game';

export interface GameRepository {
  findGameById(gameId: string): Promise<Game>;
  create(game: Game): Promise<Game>;
}
