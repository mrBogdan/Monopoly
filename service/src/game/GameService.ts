import { Clock } from '../clock';
import { IdGenerator } from '../idGenerator/IdGenerator';

import { createGame, Game } from './Game';
import { GameCandidate } from './GameCandidate';
import { GameNotFoundError } from './GameNotFoundError';
import { GameRepository } from './GameRepository';
import { GameStatus } from './GameStatus';
import { MoveOutcome, MoveStrategyFactory } from './Move';


export class GameService {
  constructor(
    private gameRepository: GameRepository,
    private moveStrategyFactory: MoveStrategyFactory,
    private clock: Clock,
  ) {}

  create(gameCandidate: GameCandidate): Promise<Game> {
    const game = this.createGameInstance(gameCandidate);
    return this.gameRepository.create(game);
  }

  async findRequiredGame(gameId: string): Promise<Game> {
    const game = await this.gameRepository.findRequiredGameById(gameId);

    if (!game) {
      throw new GameNotFoundError(gameId);
    }

    return game;
  }

  async move(gameId: string, playerId: number): Promise<MoveOutcome<unknown>> {
    const game = await this.findRequiredGame(gameId);
    const moveStrategy = this.moveStrategyFactory.createMoveStrategy(game);
    return moveStrategy.moveOutcome();
  }

  private createGameInstance(candidate: GameCandidate): Game {
    const idGenerator = new IdGenerator();
    return createGame(
      idGenerator.generateUUID(),
      candidate.gameType,
      candidate.gameOwner,
      GameStatus.ROOM,
      candidate.players,
      this.clock.now());
  }
}
