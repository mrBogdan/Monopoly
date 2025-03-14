import { createGameAdapter } from '../game/GameAdapter';
import { createGameService } from '../game/GameService';
import { GameRepository } from '../game/GameRepository';

export const actions = {
  Game: 'game',
  Chat: 'chat',
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const actionAdapters: {[key: string]: any } = {
  [actions.Game]: createGameAdapter(createGameService({} as GameRepository)),
};
