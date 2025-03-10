import { createGameAdapter } from './game/GameAdapter';
import { createGameService } from './game/GameService';
import { GameRepository } from './game/GameRepository';

export const actions = {
  Game: 'game',
  Chat: 'chat',
};

export const actionAdapters: any = {
  [actions.Game]: createGameAdapter(createGameService({} as GameRepository)),
};
