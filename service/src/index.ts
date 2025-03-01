import { Player } from './Player';
import { Room } from './Room';
import { GameType, PlayersCount } from './Game';
import { GameEventBus } from './GameEventBus';

const run = async () => {
  const gameEventBus = GameEventBus.getInstance();
  const bogdan = new Player('1', 'Bogdan');
  const userId = '42';
  const roomId = '433';

  const room = new Room(
    roomId,
    [],
    5,
    userId,
    false,
  );

  room.join(bogdan);
};

run();
