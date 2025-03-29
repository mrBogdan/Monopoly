import { Server } from 'node:http';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';

import { getHttpServer } from '../../../http/getHttpServer';
import { AppModule } from '../../../AppModule';
import { Application } from '../../../Application';
import { getGlobalContainer } from '../../../di/globalContainer';
import { Router } from '../../../http/router/Router';
import { getTestConfig } from '../../../nodejs/getTestConfig';
import request from 'supertest';

describe('UserPublicController', () => {
  let listeningServer: Server;
  let container: StartedPostgreSqlContainer;
  let app: Application;

  beforeAll(async () => {
    const postgresContainer = new PostgreSqlContainer();
    container = await postgresContainer.start();
    app = new Application(getGlobalContainer(), new Router(), AppModule, getTestConfig({
      postgresConfig: {
        host: container.getHost(),
        port: container.getMappedPort(5432),
        user: container.getUsername(),
        password: container.getPassword(),
        database: container.getDatabase(),
      },
      withMigration: true,
    }));
    const server = await app.run(getHttpServer);
    listeningServer = server.listen(0);
  });

  afterAll(async () => {
    await app.gracefulShutdown();
    await container.stop();
  });

  describe('singUp', () => {
    it('should return a user', async () => {
      const response = await request(listeningServer).post('/public/sign-up').send({});
      expect(response.status).toBe(200);
      expect(response.body).toEqual({});
    });
  });
});
