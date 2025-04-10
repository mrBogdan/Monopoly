import { Broadcast, Hub, Subscribe, ReplyAction } from '../wss';
import { GameService } from './GameService';
import { MoveStrategyOutcomeDTO } from './Move';

type MovePayload = {
  playerId: number;
  moveOutcome: MoveStrategyOutcomeDTO<unknown>;
}

@Hub('game')
export class GameHub {
  constructor(private readonly gameService: GameService) {
  }

  @Subscribe(GameAction.MOVE)
  async go(gameId: string, playerId: number): Promise<Broadcast<MovePayload>> {
    const moveOutcome = await this.gameService.move(gameId, playerId);

    return {
      roomId: gameId,
      type: GameAction.MOVE,
      action: ReplyAction.BROADCAST,
      data: {
        playerId,
        moveOutcome: moveOutcome.toDTO(),
      }
    }
  }
}
