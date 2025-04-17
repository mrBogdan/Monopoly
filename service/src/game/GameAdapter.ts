import { GameAction } from '../action/GameAction';
import { PayPayload } from '../action/PayPayload';
import { MapTile } from '../tile/MapTile';
import { mapTiles } from '../tiles/tiles';

import { GameService } from './GameService';

export class GameAdapter {
  constructor(private gameService: GameService) {
  }

  getTiles(): MapTile[] {
    return mapTiles;
  }

  pay(payload: GameAction<PayPayload>) {
    return {
      status: 'PAID',
      payload,
    }
  }
}

export const createGameAdapter = (gameService: GameService): GameAdapter => {
  return new GameAdapter(gameService);
}
