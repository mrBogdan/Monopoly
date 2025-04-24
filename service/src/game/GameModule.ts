import { Module } from '../decorators';

import { Dice } from './Dice';
import { GameHub } from './GameHub';
import { GamePublicController } from './GamePublicController';
import { GameService } from './GameService';
import { memoryGameRepository } from './MemoryGameRepository';
import { MoveStrategyFactory } from './move';

@Module({
  controllers: [GamePublicController],
  services: [memoryGameRepository, GameService, GameHub, Dice, MoveStrategyFactory]
})
export class GameModule {}
