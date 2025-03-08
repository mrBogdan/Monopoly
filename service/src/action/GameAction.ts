import { Action } from './Action';

export interface GameAction<K> extends Action {
  gameId: string;
  payload: K;
}
