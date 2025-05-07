import { Module } from '../../decorators';

import { roomRepositoryProvider } from './MemoryRoomRepository';
import { RoomService } from './RoomService';

@Module({
  services: [roomRepositoryProvider, RoomService],
})
export class RoomModule {}
