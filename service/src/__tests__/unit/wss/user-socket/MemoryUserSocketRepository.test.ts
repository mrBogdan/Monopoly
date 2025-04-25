import {WebSocket} from 'ws';

import { MemoryUserSocketRepository, UserSocket } from '../../../../wss';

describe('MemoryUserSocketRepository', () => {
  it('should add user socket', () => {
    const userSocketRepository = new MemoryUserSocketRepository();
    const socket = {isPaused: false} as WebSocket;
    const userId = 'user1';

    userSocketRepository.addUserSocket(new UserSocket(userId, socket));

    expect(userSocketRepository.getUserSocket(userId)).toBe(socket);
  });

  it('should get user sockets', () => {
    const userSocketRepository = new MemoryUserSocketRepository();
    const socket1 = {isPaused: false} as WebSocket;
    const socket2 = {isPaused: false} as WebSocket;
    const userId1 = 'user1';
    const userId2 = 'user2';

    userSocketRepository.addUserSocket(new UserSocket(userId1, socket1));
    userSocketRepository.addUserSocket(new UserSocket(userId2, socket2));

    const userSockets = userSocketRepository.getUserSockets([userId1, userId2]);

    expect(userSockets.length).toBe(2);
  });
});
