import { GAME_REPOSITORY, GameRepository } from './GameRepository';
import { Game } from './Game';
import { Injectable } from '../di';

@Injectable()
export class MemoryGameRepository implements GameRepository {
  private games: Map<string, Game>;

  constructor() {
    this.games = new Map<string, Game>();
  }

  findRequiredGameById(gameId: string): Promise<Game> {
    return new Promise((resolve, reject) => {
      const game = this.games.get(gameId);
      if (game) {
        resolve(game);
      } else {
        reject(new Error('Game not found'));
      }
    });
  }

  create(game: Game): Promise<Game> {
    return new Promise((resolve) => {
      this.games.set(game.getId(), game);
      resolve(game);
    });
  }
}

export const memoryGameRepository = () => ({
  param: GAME_REPOSITORY,
  useClass: MemoryGameRepository,
})
