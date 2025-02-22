import { Player } from './Player';

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
  constructor(private gameConfig: GameConfig) {
  }

  start() {}

  finish() {}
}
