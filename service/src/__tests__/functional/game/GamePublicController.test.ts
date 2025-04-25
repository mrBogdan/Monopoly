import { Server } from 'node:http';

import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { Client } from 'pg';
import request from 'supertest';

import { Application } from '../../../Application';
import { AppModule } from '../../../AppModule';
import { Container } from '../../../di';
import { GameSettings } from '../../../game/GameSettings';
import { GameType } from '../../../game/GameType';
import { USER_ID } from '../../../http';
import { Room, RoomService } from '../../../wss';
import { getTestConfig } from '../../getTestConfig';
import { getTestConfigModule } from '../getTestConfigModule';
import { runTestApp } from '../runTestApp';

describe('GamePublicController', () => {
  let app: Application;
  let listeningServer: Server;
  let container: StartedPostgreSqlContainer;
  let roomService: RoomService;
  let client: Client;

  const USER_ID_1 = 'user1';
  const USER_ID_2 = 'user2';
  const USER_ID_3 = 'user3';

  const truncateRooms = async () => {
    const rooms = await roomService.getRooms();
    await Promise.all(rooms.map(async ({id}) => roomService.deleteRoom(id)));
  };

  const truncateUsers = async () => {
    await client.query('TRUNCATE TABLE users CASCADE');
  };


  const verifyRoom = async (roomId: string, userId: string) => {
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
    const postgresContainer = new PostgreSqlContainer();
    container = await postgresContainer.start();
    app = await runTestApp([...AppModule, getTestConfigModule(getTestConfig({
      postgresConfig: {
        host: container.getHost(),
        port: container.getMappedPort(5432),
        user: container.getUsername(),
        password: container.getPassword(),
        database: container.getDatabase(),
      },
      withMigration: true,
    }))]);
    listeningServer = app.get<Server>(Server);
    roomService = app.get<RoomService>(RoomService);
    client = app.get<Client>(Client);
  });

  afterAll(async () => {
    await Promise.all([
      app.gracefulShutdown(async (container: Container) => {
        const client: Client = container.resolve<Client>(Client);
        const server: Server = container.resolve<Server>(Server);
        await Promise.all([
          client.end(),
          server.close(),
        ]);
      }),
      container.stop(),
    ]);
  });

  beforeEach(async () => {
    await Promise.all([
      truncateUsers(),
      truncateRooms(),
    ]);
  });

  it('should create a game and room', async () => {
    await createUser();
    const gameSettings: GameSettings = {
      gameType: GameType.USUAL,
      amountOfPlayers: 2,
    };

    const room = await createGame(gameSettings);
    await verifyRoom(room.id, USER_ID_1);
  });

  it('should join a game', async () => {
    await Promise.all([
      createUser(USER_ID_1),
      createUser(USER_ID_2, 'email@gmail.com'),
    ]);
    const gameSettings: GameSettings = {
      gameType: GameType.USUAL,
      amountOfPlayers: 2,
    };

    const room = await createGame(gameSettings) as Room;
    await verifyRoom(room.id, USER_ID_1);

    await joinRoom(room.id);
    await joinRoom(room.id, USER_ID_2);
    await verifyRoom(room.id, USER_ID_2);

    const updatedRoom = await roomService.getRoom(room.id);
    expect(updatedRoom.users.get(USER_ID_3)).not.toBeDefined();
  });
});
