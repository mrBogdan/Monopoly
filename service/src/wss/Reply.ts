import { ReplyAction } from './ReplyAction';

export interface Reply<T> {
  action: ReplyAction.REPLY;
  type: string;
  userId: string;
  data: T;
}
