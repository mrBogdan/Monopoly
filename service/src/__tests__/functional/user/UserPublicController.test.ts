import { Server } from 'node:http';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import request from 'supertest';

import { AppModule } from '../../../AppModule';
import { Application } from '../../../Application';
import { getTestConfig } from '../../../nodejs/getTestConfig';
import { USER_REPOSITORY, UserRepository } from '../../../user/UserRepository';
import { runTestApp } from '../runTestApp';
import { getTestConfigModule } from '../getTestConfigModule';
import { Container } from '../../../di/Container';
import { Client } from 'pg';

jest.setTimeout(15000);

describe('UserPublicController', () => {
  let listeningServer: Server;
  let container: StartedPostgreSqlContainer;
  let app: Application;
  let userRepository: UserRepository;

  const verifyUser = async (id: string, email: string, name: string) => {
    const user = await userRepository.findByEmail(email);
    expect(user).toBeDefined();
    expect(user?.id).toEqual(id);
    expect(user?.name).toEqual(name);
    expect(user?.email).toEqual(email);
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
    userRepository = app.get<UserRepository>(USER_REPOSITORY);
  });

  afterAll(async () => {
    await Promise.all([
      app.gracefulShutdown(async (container: Container) => {
        const client: Client = container.resolve<Client>(Client);
        const server: Server = container.resolve<Server>(Server);
        await Promise.all([
          client.end(),
          server.close(),
        ])
      }),
      container.stop(),
    ]);
  });

  describe('singUp', () => {
    it('should throw error on empty body', async () => {
      const response = await request(listeningServer).post('/public/sign-up').send({});
      expect(response.status).toBe(400);
      expect(response.body.reason).toEqual('name is required');
    });

    it('should register user', async () => {
      const user = {
        name: 'Test User',
        email: `test@example.com`,
        password: 'securePassword123!',
        repeatedPassword: 'securePassword123!',
      };
      const response = await request(listeningServer).post('/public/sign-up').send(user);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: expect.any(String),
        name: user.name,
        email: user.email,
      });
      await verifyUser(response.body.id, response.body.email, response.body.name);
    });
  });
});
