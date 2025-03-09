import { GameStatus } from './GameStatus';
import { Player } from '../Player';
import { GameType } from './GameType';
import { GameCandidate } from './GameCandidate';
import { PlayerNotFoundError } from '../PlayerNotFoundError';

export class Game {
  constructor(
    private type: GameType,
    private roomOwner: string,
    private status: GameStatus,
    private players: Player[],
    private id?: string,
    private createdAt?: number
    ) {
  }

  findRequiredPlayerByUserId(userId: string): Player {
    const player = this.players.find((player) => player.userId === userId);

    if (!player) {
      throw new PlayerNotFoundError(userId);
    }

    return player;
  }

  isCompleted(): boolean {
    return this.status === GameStatus.COMPLETED;
  }

  static createGame(candidate: GameCandidate): Game {
    return new Game(
      candidate.gameType,
      candidate.gameOwner,
      GameStatus.ROOM,
      candidate.players,
    )
  }
}
