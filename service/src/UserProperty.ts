import { Tile } from './Tile';
import { Player } from './Player';

export class UserProperty {
  constructor(private tile: Tile, private player: Player[]) {}
}
