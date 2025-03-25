import { GameService } from './GameService';
import { GameAction } from '../action/GameAction';
import { MapTile } from '../tile/MapTile';
import { mapTiles } from '../tiles/tiles';
import { PayPayload } from '../action/PayPayload';

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
