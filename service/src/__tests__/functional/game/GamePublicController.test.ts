import { Server } from 'node:http';

import { Client } from 'pg';
import request from 'supertest';
import wsRequest from 'superwstest';

import { AppModule } from '../../../AppModule';
import { GameSettings } from '../../../game/GameSettings';
import { GameType } from '../../../game/GameType';
import { MoveStrategyType } from '../../../game/move';
import { AUTHORIZATION, USER_ID } from '../../../http';
import { bearer, Secure } from '../../../secure';
import { Room, RoomService } from '../../../wss';
import { runTestApp, TestApp } from '../runTestApp';

jest.setTimeout(15000);

describe('GamePublicController', () => {
  let app: TestApp;
  let listeningServer: Server;
  let roomService: RoomService;
  let client: Client;
  let token: string;

  const USER_ID_1 = 'user1';
  const USER_ID_2 = 'user2';
  const USER_ID_3 = 'user3';

  const gameSettings: GameSettings = {
    gameType: GameType.USUAL,
    amountOfPlayers: 2,
  };

  const truncateRooms = async () => {
    const rooms = await roomService.getRooms();
    await Promise.all(rooms.map(async ({id}) => roomService.deleteRoom(id)));
  };

  const truncateUsers = async () => {
    await client.query('TRUNCATE TABLE users CASCADE');
  };

  const verifyUserConnectedToRoom = async (roomId: string, userId: string) => {
    const room = await roomService.getRoom(roomId);

    expect(room.id).toBe(roomId);
    expect(room.users.get(userId)).toBeDefined();
  };

  const createGame = async (gameSettings: GameSettings, userId = USER_ID_1): Promise<Room> => {
    const response = await request(listeningServer).post('/public/game/create')
      .set(USER_ID, userId)
      .send({
        gameSettings,
      });

    expect(response.status).toBe(200);
    return response.body;
  };

  const joinRoom = async (gameId: string, userId = USER_ID_1): Promise<void> => {
    const response = await request(listeningServer).post('/public/game/join')
      .set(USER_ID, userId)
      .send({
        gameId,
      });

    expect(response.status).toBe(200);
  };

  const createUser = async (userId: string = USER_ID_1, email: string = 'test@monopoly.com', name: string = 'TestName', password: string = 'strongPassword') => {
    await client.query('INSERT INTO users(id, email, name, "passwordHash") values ($1, $2, $3, $4)', [
      userId,
      email,
      name,
      password,
    ]);
  };

  beforeAll(async () => {
    app = await runTestApp(AppModule);
    listeningServer = app.get<Server>(Server);
    roomService = app.get<RoomService>(RoomService);
    client = app.get<Client>(Client);
    const secure = app.get<Secure>(Secure);

    token = secure.encode({id: USER_ID_1});
  });

  afterAll(async () => {
    await app.gracefulShutdown();
  });

  beforeEach(async () => {
    await Promise.all([
      truncateUsers(),
      truncateRooms(),
    ]);
  });

  it('should create a game and room', async () => {
    await createUser();

    const room = await createGame(gameSettings);
    await verifyUserConnectedToRoom(room.id, USER_ID_1);
  });

  it('should join a game', async () => {
    await Promise.all([
      createUser(USER_ID_1),
      createUser(USER_ID_2, 'email@gmail.com'),
    ]);

    const room = await createGame(gameSettings);
    await verifyUserConnectedToRoom(room.id, USER_ID_1);

    await joinRoom(room.id);
    await joinRoom(room.id, USER_ID_2);
    await verifyUserConnectedToRoom(room.id, USER_ID_2);

    const updatedRoom = await roomService.getRoom(room.id);
    expect(updatedRoom.users.get(USER_ID_3)).not.toBeDefined();
  });

  it('should move', async () => {
    await createUser(USER_ID_1);
    const room = await createGame(gameSettings);
    await joinRoom(room.id);

    await wsRequest(listeningServer)
      .ws('/ws')
      .set(AUTHORIZATION, bearer(token))
      .sendJson({
        type: 'game:move',
        userId: USER_ID_1,
        data: {
          playerId: 1,
          gameId: room.id,
        },
      })
      .expectJson((actual) => {
        expect(actual).toEqual({
          type: 'move',
          payload: {
            playerId: 1,
            moveOutcome: {
              strategy: MoveStrategyType.TWO_DICE,
              outcome: {
                first: expect.any(Number),
                second: expect.any(Number),
              },
            },
          },
        });
      })
      .close()
      .expectClosed();
  });
});
