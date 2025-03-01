import { RandMachine } from './RandMachine';

export class Dice {
  constructor(private randMachine: RandMachine) {
  }

  roll(): number {
    return this.randMachine.rand(1, 6);
  }
}
