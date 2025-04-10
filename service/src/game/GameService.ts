import { GameRepository } from './GameRepository';
import { createGame, Game } from './Game';
import { GameNotFoundError } from './GameNotFoundError';
import { GameCandidate } from './GameCandidate';
import { IdGenerator } from '../idGenerator/IdGenerator';
import { GameStatus } from './GameStatus';
import { MoveOutcome } from './Move/MoveOutcome';
import { MoveStrategyFactory } from './Move/MoveStrategyFactory';
import { Clock } from '../clock';

export class GameService {
  constructor(
    private gameRepository: GameRepository,
    private moveStrategyFactory: MoveStrategyFactory,
    private clock: Clock,
  ) {
  }

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
    const moveOutcome = moveStrategy.moveOutcome();

    const a = {playerId, moveOutcome};
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
