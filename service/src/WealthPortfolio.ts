import { Player } from './Player';
import { PlayerProperty } from './PlayerProperty';

export class WealthPortfolio {
  private readonly balance: PlayerProperty[];

  constructor(private player: Player) {
  }

  addProperty(property: PlayerProperty) {
    this.balance.push(property);
  }

  removeProperty(property: PlayerProperty) {

  }
}
