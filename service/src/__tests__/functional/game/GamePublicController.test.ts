import { Server } from 'node:http';

import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import request from 'supertest';
import wsRequest from 'superwstest';

import { Application } from '../../../Application';
import { GameModule } from '../../../game/GameModule';
import { MigrationModule } from '../../../migrations/MigrationModule';
import { User, UserModule, USER_REPOSITORY, UserRepository } from '../../../user';
import { RoomService } from '../../../wss';
import { getTestConfig } from '../../getTestConfig';
import { getTestConfigModule } from '../getTestConfigModule';
import { runTestApp } from '../runTestApp';

describe('GamePublicController', () => {
  let app: Application;
  let listeningServer: Server;
  let container: StartedPostgreSqlContainer;
  let roomService: RoomService;

  const userId = 'user1';

  const verifyRoom = async (roomId: string, userId: string) => {
    const room = await roomService.getRoom(roomId);

    expect(room.id).toBe(roomId);
    expect(room.users.get(userId)).toBeDefined();
  }

  beforeAll(async () => {
    const postgresContainer = new PostgreSqlContainer();
    container = await postgresContainer.start();
    app = await runTestApp([GameModule, UserModule, MigrationModule, getTestConfigModule(getTestConfig({
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

    const userRepository = app.get<UserRepository>(USER_REPOSITORY);
    roomService = app.get<RoomService>(RoomService);

    await userRepository.create(new User(userId, 'test', '1234', 'hello@test.com'));
  });

  afterAll(async () => {
  });

  it('should create a game and room', async () => {
    const gameSettings = {
      gameType: 'test',
      gameOptions: {},
    };

    const response = await request(listeningServer).post('/public/game/create').send({
      gameSettings,
      userId,
    });

    expect(response.status).toBe(200);
    await verifyRoom(response.body.id, userId);
  });
});
