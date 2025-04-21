import { WebSocket } from 'ws';

import { Injectable } from '../../di';

import { UserSocket } from './UserSocket';

@Injectable()
export class MemoryUserSocketRepository {
  private userSockets: Map<string, WebSocket> = new Map();
  private sockets: WeakMap<WebSocket, {userId: string}> = new WeakMap();

  public addUserSocket(userSocket: UserSocket): void {
    this.userSockets.set(userSocket.userId, userSocket.socket);
    this.sockets.set(userSocket.socket, {userId: userSocket.userId});
  }

  public getUserSocket(userId: string): WebSocket | undefined {
    return this.userSockets.get(userId);
  }

  public removeUserSocket(inputSocket: WebSocket): void {
    const userInfo = this.sockets.get(inputSocket);

    if (!userInfo) {
      return;
    }

    this.userSockets.delete(userInfo.userId);
    this.sockets.delete(inputSocket);
  }

  public getUserSockets(userIds: string[]): UserSocket[] {
    return this.userSockets.entries()
      .map(([userId, socket]) => UserSocket.of(userId, socket))
      .filter(us => userIds.includes(us.userId))
      .toArray();
  }

  public getAllUserSockets(): Map<string, WebSocket> {
    return this.userSockets;
  }
}
