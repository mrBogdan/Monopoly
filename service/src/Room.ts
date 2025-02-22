import { Player } from './Player';
import { GameEventBus } from './GameEventBus';
import { NoPermissionError } from './NoPermissionError';
import { NotAllowedJoiningError } from './NotAllowedJoiningError';

export enum RoomEvents {
  USER_JOINED = 'RoomEvents:USER_JOINED',
}

export class Room {
  private players: Player[] = [];
  private id: string;
  private roomOwner: string;
  private isPrivate: boolean;
  private banList: Player[];

  public constructor(private gameEventBus: GameEventBus) {}

  public join(player: Player) {
    if (!this.isAllowed(player)) {
      throw new NotAllowedJoiningError(player.getId());
    }

    this.players.push(player);

    this.gameEventBus.emit(RoomEvents.USER_JOINED, {
      playerId: player.getId(),
      roomId: this.id
    });
  }

  public disconnect(player: Player) {
    this.players.splice(this.players.indexOf(player), 1);
  }

  public kickPlayer(roomOwner: Player, player: Player) {
    if (roomOwner.getId() !== this.roomOwner) {
      throw new NoPermissionError(roomOwner.getId());
    }

    this.banPlayer(player);

    this.disconnect(player);
  }

  public banPlayer(player: Player) {
    this.banList.push(player);
  }

  public start() {}

  public isVisible(): boolean {

  }

  public isAllowed(player: Player): boolean {
    return !this.banList.includes(player);
  }

  public isPublic(): boolean {
    return !this.isPrivate;
  }
}
