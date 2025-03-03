import {randomUUID} from 'node:crypto'

import { Player } from './Player';
import { Room } from './Room';
import { Bank } from './bank/Bank';


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
  private id: string;
  private bank: Bank;

  constructor(private room: Room) {
    this.id = randomUUID();
    this.bank = new Bank(room.getPlayers());
  }

  start() {

  }

  finish() {
  }
}
