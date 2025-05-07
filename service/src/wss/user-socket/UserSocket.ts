import {WebSocket} from 'ws';

export class UserSocket {
  constructor(public userId: string, public socket: WebSocket) {
  }

  public static of(userId: string, socket: WebSocket): UserSocket {
    return new UserSocket(userId, socket);
  }
}
