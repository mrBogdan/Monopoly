import { GameService } from './GameService';

export class GameAdapter {
  constructor(private gameService: GameService) {
  }

  getTiles(): MapTile[] {
    return mapTiles;
  }

  getPlayers(payload: GameAction<EmptyPayload>): Player[] {
  }

  pay(payload: GameAction<PayPayload>) {
    console.log({payload});
    return {
      status: 'PAID'
    }
  }
}
