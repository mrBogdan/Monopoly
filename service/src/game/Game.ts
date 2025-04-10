import { GameStatus } from './GameStatus';
import { Player } from './Player';
import { GameType } from './GameType';
import { PlayerNotFoundError } from './PlayerNotFoundError';

export class Game {
  constructor(
    private id: string,
    private type: GameType,
    private roomOwner: string,
    private status: GameStatus,
    private players: Player[],
    private createdAt: number,
    private startedAt?: number,
    ) {}

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

  getId(): string {
    return this.id;
  }
}

export const createGame = (
  id: string,
  type: GameType,
  roomOwner: string,
  status: GameStatus,
  players: Player[],
  createdAt: number,
  startedAt?: number,
): Game => {
  return new Game(id, type, roomOwner, status, players, createdAt, startedAt);
};
