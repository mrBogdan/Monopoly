import { Actions } from './Actions';
import { PayPayload } from './PayPayload';
import { GamePayload } from './GamePayload';

export interface Action<T> {
  type: Actions;
  userId?: string
  payload: T;
}

const payload: Action<GamePayload<PayPayload>> = {
  type: Actions.Pay,
  userId: '1',
  payload: {
    gameId: '1',
    payload: {
      to: '1',
      from: '1',
      amount: 1,
    }
  },
};
