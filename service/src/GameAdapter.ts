import { PayPayload } from './action/PayPayload';
import { GameAction } from './action/GameAction';

export class GameAdapter {
  pay(payload: GameAction<PayPayload>) {
    console.log({payload});
  }
}
