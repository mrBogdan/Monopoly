import { createGameAdapter } from '../game/GameAdapter';
import { GameRepository } from '../game/GameRepository';
import { createGameService } from '../game/GameService';

export const actions = {
  Game: 'game',
  Chat: 'chat',
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const actionAdapters: {[key: string]: any } = {
  [actions.Game]: createGameAdapter(createGameService({} as GameRepository)),
};
