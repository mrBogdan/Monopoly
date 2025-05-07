import { Controller } from '../decorators';
import { Header, Post, RequestBody, USER_ID } from '../http';
import { RoomService } from '../wss';

import { Game } from './Game';
import { GameService } from './GameService';
import { GameSettings } from './GameSettings';

@Controller('public/game')
export class GamePublicController {
  constructor(private gameService: GameService, private roomService: RoomService) {
  }

  @Post('create')
  async createGame(@Header(USER_ID) userId: string, @RequestBody('gameSettings') gameSettings: GameSettings): Promise<Game> {
    const game = await this.gameService.create({
      gameSettings,
      gameCreator: userId,
    });

    await this.roomService.createRoom(game.getId(), [userId]);

    return game;
  }

  @Post('join')
  async joinGame(@Header(USER_ID) userId: string, @RequestBody('gameId') gameId: string): Promise<void> {
    const game = await this.gameService.findRequiredGame(gameId);

    await this.roomService.join(game.getId(), userId);
  }
}
