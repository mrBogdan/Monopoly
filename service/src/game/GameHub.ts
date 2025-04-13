import { ActionParam, Broadcast, Hub, Reply, ReplyAction, Subscribe } from '../wss';
import { GameService } from './GameService';
import { MoveStrategyOutcomeDTO } from './Move';
import { mapTiles } from '../tiles/tiles';
import { MapTile } from '../tile/MapTile';
import { GameAction } from './GameAction';

type MovePayload = {
  playerId: number;
  moveOutcome: MoveStrategyOutcomeDTO<unknown>;
}

@Hub('game')
export class GameHub {
  constructor(private readonly gameService: GameService) {
  }

  @Subscribe('getTiles')
  async getTiles(@ActionParam('userId') userId: string): Promise<Reply<MapTile[]>> {
    return {
      userId,
      action: ReplyAction.REPLY,
      type: 'game:getTiles',
      data: mapTiles,
    };
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
