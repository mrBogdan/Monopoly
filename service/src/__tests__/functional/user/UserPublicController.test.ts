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
    await app.gracefulShutdown();
    await container.stop();
  });

  describe('singUp', () => {
    it('should return a user', async () => {
      const response = await request(listeningServer).post('/public/sign-up').send({});
      expect(response.status).toBe(400);
      expect(response.body.reason).toEqual('Name is required');
    });
  });
});
