import { Controller } from '../decorators';

import { GameService } from './GameService';

@Controller('public/game')
export class GamePublicController {
  constructor(private gameService: GameService) {
  }
}
