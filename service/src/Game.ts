import { Player } from './Player';
import { Room } from './Room';
import { Bank } from './Bank';
import { BankAccount } from './BankAccount';

export enum GameType {
  USUAL = 'usual',
  FAST = 'fast',
}

interface GameConfig {
  type: GameType;
  playersCount: number;
  players: Player[];
}

export class Game {
  private bank: Bank;

  constructor(private room: Room) {

    const bankAccount = BankAccount.of();
    this.bank = new Bank([...room.getPlayers()]);
  }

  start() {

  }

  finish() {}
}
