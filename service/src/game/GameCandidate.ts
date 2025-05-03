import { GameType } from './GameType';
import { Player } from './Player';

export interface GameCandidate {
  gameType: GameType;
  amountOfPlayers: number;
  gameOwner: string;
  players: Player[];
}
