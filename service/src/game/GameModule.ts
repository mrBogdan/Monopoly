import { Module } from '../decorators/Module';

import { Dice } from './Dice';
import { GameHub } from './GameHub';
import { GamePublicController } from './GamePublicController';
import { GameService } from './GameService';
import { memoryGameRepository } from './MemoryGameRepository';

@Module({
  controllers: [GamePublicController],
  services: [memoryGameRepository, GameService, GameHub, Dice]
})
export class GameModule {}
