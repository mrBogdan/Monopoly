import { Server } from 'node:http';

import request from 'supertest';

import { AppModule } from '../../../AppModule';
import { mapTiles } from '../../../tiles/tiles';
import { runTestApp, TestApp } from '../runTestApp';

describe('TilePublicController', () => {
  let app: TestApp;
  let listeningServer: Server;

  beforeAll(async () => {
    app = await runTestApp(AppModule);
    listeningServer = app.get<Server>(Server);
  });

  afterAll(async () => {
    await app.gracefulShutdown();
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
