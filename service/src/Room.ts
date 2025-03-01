import { Player } from './Player';
import { NoPermissionError } from './NoPermissionError';
import { NotAllowedJoiningError } from './NotAllowedJoiningError';

export class Room {
  private banList: Player[];

  public constructor(
    private id: string,
    private players: Player[],
    private requiredPlayersAmount: number,
    private roomOwner: string,
    private isPrivate: boolean,
  ) {}

  public join(player: Player) {
    if (!this.isAllowed(player)) {
      throw new NotAllowedJoiningError(player.getId());
    }

    this.players.push(player);
  }

  public disconnect(player: Player) {
    this.players.splice(this.players.indexOf(player), 1);
  }

  public getPlayers(): Player[] {
    return this.players;
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

  public start() {
  }

  public isVisible(player: Player): boolean {
    return !this.banList.includes(player);
  }

  public isAllowed(player: Player): boolean {
    return !this.banList.includes(player);
  }

  public isPublic(): boolean {
    return !this.isPrivate;
  }
}
