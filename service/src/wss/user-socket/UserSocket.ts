import {WebSocket} from 'ws';

export class UserSocket {
  constructor(public userId: string, public socket: WebSocket) {
  }
}
