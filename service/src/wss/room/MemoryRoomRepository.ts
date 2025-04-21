import { Injectable } from '../../di';

import { Room } from './Room';
import { RoomNotFoundError } from './RoomNotFoundError';
import { ROOM_REPOSITORY, RoomRepository } from './RoomRepository';

@Injectable()
export class MemoryRoomRepository implements RoomRepository {
  private rooms: Map<string, Room>;

  constructor() {
    this.rooms = new Map();
  }

  public async createRoom(room: Room): Promise<Room> {
    this.rooms.set(room.id, room);
    return room;
  }

  public async getRoom(roomId: string): Promise<Room> {
    const room = await this.findRoom(roomId);

    if (!room) {
      throw new RoomNotFoundError(roomId);
    }

    return room;
  }

  public async findRoom(roomId: string): Promise<Room | undefined> {
    return this.rooms.get(roomId);
  }

  public async deleteRoom(roomId: string): Promise<void> {
    this.rooms.delete(roomId);
  }

  public async getRooms(): Promise<Room[]> {
    return Array.from(this.rooms.values());
  }

  public async join(roomId: string, userId: string): Promise<void> {
    const room = await this.getRoom(roomId);
    await room.addUser(userId, {
      roomId,
      id: userId,
    });
  }
}

export const roomRepositoryProvider = {
  param: ROOM_REPOSITORY,
  useClass: MemoryRoomRepository,
}
