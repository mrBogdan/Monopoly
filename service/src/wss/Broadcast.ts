import { ReplyAction } from './ReplyAction';

export interface Broadcast<T> {
  action: ReplyAction.BROADCAST;
  type: string;
  roomId: string;
  data: T;
}
