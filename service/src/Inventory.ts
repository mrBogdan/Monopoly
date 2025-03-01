import { Player } from './Player';
import { UserProperty } from './UserProperty';

export class Inventory {
  private readonly balance: UserProperty[];

  constructor(private player: Player) {
  }

  addProperty(property: UserProperty) {
    this.balance.push(property);
  }

  removeProperty(property: UserProperty) {

  }
}
