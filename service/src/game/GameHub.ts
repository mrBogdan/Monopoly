import { Broadcast, EventParam, Hub, Subscribe } from '../wss';

import { GameAction } from './GameAction';
import { GameService } from './GameService';
import { MoveStrategyOutcomeDTO } from './move';

type MovePayload = {
  playerId: number;
  moveOutcome: MoveStrategyOutcomeDTO<unknown>;
}

@Hub('game')
export class GameHub {
  constructor(private readonly gameService: GameService) {
  }

  @Subscribe(GameAction.MOVE)
  async go(@EventParam('gameId') gameId: string, @EventParam('playerId') playerId: number): Promise<Broadcast<MovePayload>> {
    const moveOutcome = await this.gameService.move(gameId);

    return new Broadcast(GameAction.MOVE, gameId, {
      playerId,
      moveOutcome: moveOutcome.toDTO(),
    });
  }
}
