import { Module } from '../decorators/Module';
import { GamePublicController } from './GamePublicController';
import { memoryGameRepository } from './MemoryGameRepository';
import { GameHub } from './GameHub';
import { GameService } from './GameService';

@Module({
  controllers: [GamePublicController],
  services: [memoryGameRepository, GameService, GameHub]
})
export class GameModule {}
