import { Injectable } from '../di';
import { RandMachine } from '../rand/RandMachine';

@Injectable()
export class Dice {
  constructor(private randMachine: RandMachine) {
  }

  roll(): number {
    return this.randMachine.rand(1, 6);
  }
}
