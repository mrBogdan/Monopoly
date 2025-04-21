import { Inject, Injectable } from '../../di';

import { Room } from './Room';
import { ROOM_REPOSITORY, RoomRepository } from './RoomRepository';

@Injectable()
export class RoomService {
  constructor(@Inject(ROOM_REPOSITORY) private readonly roomRepository: RoomRepository) {}

  async getRoom(id: string): Promise<Room> {
    return this.roomRepository.getRoom(id);
  }

  async createRoom(room: Room): Promise<Room> {
    return this.roomRepository.createRoom(room);
  }

  async getRooms(): Promise<Room[]> {
    return this.roomRepository.getRooms();
  }

  async deleteRoom(id: string): Promise<void> {
    return this.roomRepository.deleteRoom(id);
  }

  async join(roomId: string, userId: string): Promise<void> {
    return this.roomRepository.join(roomId, userId);
  }
}
