import { GameAdapter } from './GameAdapter';

export const actions = {
  Game: 'game',
  Chat: 'chat',
}

export const actionAdapters: any = {
  [actions.Game]: new GameAdapter(),
}
