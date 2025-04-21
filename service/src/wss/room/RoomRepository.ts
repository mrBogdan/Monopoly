import { Room } from './Room';

export const ROOM_REPOSITORY = Symbol('ROOM_REPOSITORY');

export interface RoomRepository {
  getRoom(roomId: string): Promise<Room>;
  getRooms(): Promise<Room[]>;
  findRoom(roomId: string): Promise<Room | undefined>;
  join(roomId: string, userId: string): Promise<void>;
  createRoom(room: Room): Promise<Room>;
  deleteRoom(roomId: string): Promise<void>;
}
