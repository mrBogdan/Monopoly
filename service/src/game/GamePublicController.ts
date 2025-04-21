import { Controller } from '../decorators';
import { Post, RequestBody } from '../http';
import { RoomService } from '../wss/room/RoomService';

import { Game } from './Game';
import { GameService } from './GameService';
import { GameSettings } from './GameSettings';

@Controller('public/game')
export class GamePublicController {
  constructor(private gameService: GameService, private roomService: RoomService) {
  }

  @Post('create')
  async createGame(@RequestBody('gameSettings') gameSettings: GameSettings, @RequestBody('userId') userId: string): Promise<Game> {
    const game = await this.gameService.create({
      gameSettings,
      gameCreator: userId,
    });

    this.roomService

    return game;
  }
}
