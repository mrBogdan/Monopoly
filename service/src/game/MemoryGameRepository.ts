import { Injectable } from '../di';

import { Game } from './Game';
import { GameNotFoundError } from './GameNotFoundError';
import { GAME_REPOSITORY, GameRepository } from './GameRepository';

@Injectable()
export class MemoryGameRepository implements GameRepository {
  private games: Map<string, Game>;

  constructor() {
    this.games = new Map<string, Game>();
  }

  async getGameById(gameId: string): Promise<Game> {
    const game = this.games.get(gameId);

    if (!game) {
      throw new GameNotFoundError(gameId);
    }

    return game;
  }

  async create(game: Game): Promise<Game> {
    this.games.set(game.getId(), game);
    return game;
  }

  async deleteGame(gameId: string): Promise<void> {
    this.games.delete(gameId);
  }
}

export const memoryGameRepository = () => ({
  param: GAME_REPOSITORY,
  useClass: MemoryGameRepository,
})
