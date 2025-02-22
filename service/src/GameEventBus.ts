import {EventEmitter} from 'node:events';

export class GameEventBus extends EventEmitter {
  private static instance: GameEventBus;

  private constructor() {
    super();
  }

  static getInstance(): GameEventBus {
    if (!GameEventBus.instance) {
      GameEventBus.instance = new GameEventBus();
    }

    return GameEventBus.instance;
  }
}
