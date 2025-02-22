import { Player } from './Player';
import { Room } from './Room';
import { GameType, PlayersCount } from './Game';
import { GameEventBus } from './GameEventBus';

const run = async () => {
  const gameEventBus = GameEventBus.getInstance();
  const bogdan = new Player('1', 'Bogdan');

  const room = new Room(GameType.USUAL, 5);

  room.join(bogdan);
};

run();
