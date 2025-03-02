import { Tile } from './Tile';
import { Player } from './Player';

export class PlayerProperty {
  constructor(private tile: Tile, private player: Player[]) {}
}
