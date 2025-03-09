import { PayPayload } from './action/PayPayload';
import { GameAction } from './action/GameAction';
import { mapTiles } from './tiles/tiles';
import { EmptyPayload } from './action/EmptyPayload';
import { Player } from './Player';
import { MapTile } from './tile/MapTile';

export class GameAdapter {
  getTiles(): MapTile[] {
    return mapTiles;
  }

  getPlayers(payload: GameAction<EmptyPayload>): Player[] {
    const players: Player[] = [
      {

      }
    ];

    return players;
  }

  pay(payload: GameAction<PayPayload>) {
    console.log({payload});
    return {
      status: 'PAID'
    }
  }
}
