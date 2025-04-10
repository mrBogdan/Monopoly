import { Game } from './Game';
import { MapState } from './MapState';

export interface GameContext {
  game: Game;
  mapState: MapState;
}
