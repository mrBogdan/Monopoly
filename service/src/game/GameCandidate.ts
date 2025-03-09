import { Player } from '../Player';
import { GameType } from './GameType';

export interface GameCandidate {
  gameType: GameType;
  amountOfPlayers: number;
  gameOwner: string;
  players: Player[];
}
