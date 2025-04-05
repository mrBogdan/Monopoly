import { Broadcast, Hub, Subscribe } from '../wss';
import { ReplyAction } from '../wss/ReplyAction';
import { Dice } from './Dice';

enum GameAction {
  GO = 'go',
  BUY = 'buy',
  PAY = 'pay',
}

type PayPayload = {
  playerId: string;
  balance: number;
}

type BuyPayload = {

}

type GoPayload = {
  playerId: string;
  move: MoveStrategy;
}

enum MoveStrategyType {
  TWO_DICE = 'two-dice',
}

interface TwoDiceOutcome {
  first: number;
  second: number;
}

interface MoveStrategyOutcomeDTO<T> {
  strategy: MoveStrategyType;
  outcome: T;
}

class TwoDiceStrategyOutcome implements MoveOutcome {
  constructor(
    private first: number,
    private second: number
  ) {}

  toDTO(): MoveStrategyOutcomeDTO<TwoDiceOutcome> {
    return {
      strategy: MoveStrategyType.TWO_DICE,
      outcome: {
        first: this.first,
        second: this.second,
      }
    }
  }
}

interface MoveOutcome {
  toDTO(): MoveStrategyOutcomeDTO<unknown>;
}

const createTwoDiceStrategyOutcome = (first: number, second: number): TwoDiceStrategyOutcome =>
  new TwoDiceStrategyOutcome(first, second);

class TwoDiceStrategy implements MoveStrategy {
  constructor(private readonly dice: Dice) {
  }

  moveOutcome(): TwoDiceStrategyOutcome {
    const first = this.dice.roll();
    const second = this.dice.roll();
    return createTwoDiceStrategyOutcome(first, second);
  }
}

interface MoveStrategy {
  moveOutcome(): MoveOutcome;
}

interface MoveStrategyFactory {
  createMoveStrategy(): MoveStrategy;
}

@Hub('game')
class GameHub {
  constructor(private moveStrategyFactory: MoveStrategyFactory) {
  }

  @Subscribe(GameAction.GO)
  go(playerId: string, roomId: string): Broadcast<unknown> {
    const moveStrategy = this.moveStrategyFactory.createMoveStrategy();
    const moveOutcome = moveStrategy.moveOutcome();
    return {
      roomId,
      type: GameAction.GO,
      action: ReplyAction.BROADCAST,
      data: {
        playerId,
        moveOutcome: moveOutcome.toDTO(),
      }
    }
  }

  @Subscribe(GameAction.BUY)
  buy(playerId: string, roomId: string) {
    return {
      roomId,
      type: GameAction.BUY,
      action: ReplyAction.BROADCAST,
      data: {
        playerId,
        balance: 4500,
      }
    }
  }

  @Subscribe(GameAction.PAY)
  pay(playerId: string, roomId: string): Broadcast<PayPayload> {
    return {
      roomId,
      action: ReplyAction.BROADCAST,
      type: GameAction.PAY,
      data: {
        playerId,
        balance: 4500,
      }
    }
  }
}
