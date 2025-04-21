export class RoomNotFoundError extends Error {
  constructor(roomId: string) {
    super(`Room with ID ${roomId} not found`);
  }
}
