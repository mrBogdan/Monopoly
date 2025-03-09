import { GameRepository } from './GameRepository';
import { Game } from './Game';
import { GameNotFoundError } from './GameNotFoundError';
import { GameCandidate } from './GameCandidate';

export class GameService {
  constructor(private gameRepository: GameRepository) {
  }

  createGame(gameCandidate: GameCandidate): Promise<Game> {
    const game = Game.createGame(gameCandidate);
    return this.gameRepository.create(game);
  }

  async findRequiredGame(gameId: string): Promise<Game> {
    const game = await this.gameRepository.findGameById(gameId);

    if (!game) {
      throw new GameNotFoundError(gameId);
    }

    return game;
  }
}
