import { Clock } from '../clock';
import { Inject, Injectable } from '../di';
import { IdGenerator } from '../idGenerator/IdGenerator';
import { UserService } from '../user/UserService';

import { createGame, Game } from './Game';
import { GameCandidate } from './GameCandidate';
import { GAME_REPOSITORY, GameRepository } from './GameRepository';
import { MoveOutcome, MoveStrategyFactory } from './move';
import { Player } from './Player';

@Injectable()
export class GameService {
  constructor(
    @Inject(GAME_REPOSITORY) private gameRepository: GameRepository,
    private userService: UserService,
    private moveStrategyFactory: MoveStrategyFactory,
    private idGenerator: IdGenerator,
    private clock: Clock,
  ) {}

  async create(gameCandidate: GameCandidate): Promise<Game> {
    const user = await this.userService.getUser(gameCandidate.gameCreator);
    const player = Player.of(user, 1);
    const game = this.createGameInstance(gameCandidate, player);

    return this.gameRepository.create(game);
  }

  async findRequiredGame(gameId: string): Promise<Game> {
    return this.gameRepository.getGameById(gameId);
  }

  async move(gameId: string): Promise<MoveOutcome<unknown>> {
    const game = await this.findRequiredGame(gameId);
    const moveStrategy = this.moveStrategyFactory.createMoveStrategy(game);
    return moveStrategy.moveOutcome();
  }

  private createGameInstance(candidate: GameCandidate, player: Player): Game {
    return createGame(
      this.idGenerator.generateUUID(),
      candidate.gameSettings,
      candidate.gameCreator,
      [player],
      this.clock.now());
  }
}
