import { GameSettings } from './GameSettings';
import { GameStatus } from './GameStatus';
import { Player } from './Player';
import { PlayerNotFoundError } from './PlayerNotFoundError';

export class Game {
  constructor(
    private id: string,
    private gameSettings: GameSettings,
    private gameCreator: string,
    private status: GameStatus,
    private players: Player[],
    private createdAt: number,
    private startedAt?: number,
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

  getId(): string {
    return this.id;
  }

  settings(): GameSettings {
    return this.gameSettings;
  }
}

export const createGame = (
  id: string,
  gameSettings: GameSettings,
  roomOwner: string,
  players: Player[],
  createdAt: number,
  startedAt?: number,
): Game => {
  return new Game(id, gameSettings, roomOwner, GameStatus.CREATED, players, createdAt, startedAt);
};
