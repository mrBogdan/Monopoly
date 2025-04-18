import { Hub, Subscribe } from '../wss';

@Hub('ping')
export class PingHub {
  @Subscribe()
  subscribe() {
    return { type: 'ping', message: 'pong' };
  }
}
