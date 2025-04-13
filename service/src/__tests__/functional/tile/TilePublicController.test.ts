import { Server } from 'node:http';
import request from 'supertest';

import { runTestApp } from '../runTestApp';
import { Application } from '../../../Application';
import { AppModule } from '../../../AppModule';
import { getTestConfigModule } from '../getTestConfigModule';
import { getTestConfig } from '../../../nodejs/getTestConfig';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { mapTiles } from '../../../tiles/tiles';

describe('TilePublicController', () => {
  let app: Application;
  let container: StartedPostgreSqlContainer;
  let listeningServer: Server;

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
      }
    }))]);
    listeningServer = app.get<Server>(Server);
  });

  afterAll(async () => {
    await app.gracefulShutdown(async (di) => {
      const server: Server = di.resolve<Server>(Server);
      server.close();
      await container.stop();
    });
  });

  it('should return tiles', async () => {
    const response = await request(listeningServer)
      .get('/public/tile/list')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(mapTiles);
  });
});
