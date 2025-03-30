import { Server } from 'node:http';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import request from 'supertest';

import { getHttpServer } from '../../../http/getHttpServer';
import { AppModule } from '../../../AppModule';
import { Application } from '../../../Application';
import { getGlobalContainer } from '../../../di/globalContainer';
import { Router } from '../../../http/router/Router';
import { getTestConfig } from '../../../nodejs/getTestConfig';
import { getAnonymousModule } from '../../../getAnonymousModule';
import { getConfigValue } from '../../../ConfigService';
import { UserRegistrationDto } from '../../../user/UserRegistrationDto';

describe('UserPublicController', () => {
  let listeningServer: Server;
  let container: StartedPostgreSqlContainer;
  let app: Application;

  beforeAll(async () => {
    const postgresContainer = new PostgreSqlContainer();
    container = await postgresContainer.start();
    const config = getTestConfig({
      postgresConfig: {
        host: container.getHost(),
        port: container.getMappedPort(5432),
        user: container.getUsername(),
        password: container.getPassword(),
        database: container.getDatabase(),
      },
      withMigration: true,
    });
    app = new Application(getGlobalContainer(), new Router(), [...AppModule, getAnonymousModule(undefined, [getConfigValue(config)])], config);
    const server = await app.init(getHttpServer);
    listeningServer = server.listen(0);
  });

  afterAll(async () => {
    await Promise.all([
      app.gracefulShutdown(),
      container.stop(),
    ]);
  });

  describe('singUp', () => {
    it('should throw error on empty body', async () => {
      const response = await request(listeningServer).post('/public/sign-up').send({});
      expect(response.status).toBe(400);
      expect(response.body.reason).toEqual('Name is required');
    });

    it('should register user', async () => {
      const user = {
        name: 'Test User',
        email: `test@example.com`,
        password: 'securePassword123!',
        repeatedPassword: 'securePassword123!',
      }
      const response = await request(listeningServer).post('/public/sign-up').send(user);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: expect.any(String),
        name: user.name,
        email: user.email,
      });
    });
  });
});
