import { Tile } from './Tile';

export class MonopolyTile implements Tile {
  constructor(
    private id: string,
    private order: number,
    private price: number,
    private icon: string,
    ) {
  }

  getPrice(): number {
    return this.price;
  }

  isUpgradable(): boolean {
    return true;
  }

}
