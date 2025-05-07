import { Action } from './Action';

export interface GameAction extends Action {
  gameId: string;
}
