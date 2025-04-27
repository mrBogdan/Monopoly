import { Server } from 'node:http';

import request from 'supertest';
import wsRequest from 'superwstest';

import { AppModule } from '../../AppModule';
import { Secure } from '../../secure';
import { getTestConfig } from '../getTestConfig';

import { getTestConfigModule } from './getTestConfigModule';
import { runTestApp, TestApp } from './runTestApp';

describe('Health', () => {
  let listeningServer: Server;
  let secure: Secure;
  let token: string;
  let app: TestApp;

  beforeAll(async () => {
    app = await runTestApp([...AppModule, getTestConfigModule(getTestConfig())]);
    secure = app.get<Secure>(Secure);
    token = secure.encode({id: 'test'});
    listeningServer = app.get<Server>(Server);
  });

  afterAll(async () => {
    await app.gracefulShutdown();
  });

  it('should return 200', async () => {
    const response = await request(listeningServer).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({message: 'OK'});
  });

  it('should return 404 on path not found', async () => {
    const response = await request(listeningServer).get('/incorrect-path');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Not Found',
      status: 404,
      reason: 'Route "/incorrect-path" with method GET not found',
    });
  });

  it('should ping pong on ws', async () => {
    await wsRequest(listeningServer)
      .ws('/ws?token=' + token)
      .sendJson({type: 'ping'})
      .expectJson({type: 'ping', message: 'pong'})
      .close()
      .expectClosed();
  });

  it('should return 404 on ws type not found', async () => {
    const type = 'incorrect-type';
    await wsRequest(listeningServer)
      .ws('/ws?token=' + token)
      .sendJson({type})
      .expectJson({message: 'Not Found', status: 404, reason: `Hub "${type}" not found`})
      .close()
      .expectClosed();
  });

  it('should reject ws connection without token', async () => {
    await wsRequest(listeningServer)
      .ws('/ws')
      .expectClosed(1008, JSON.stringify({message: 'Unauthorized', status: 401, reason: 'Invalid token'}))
      .close()
      .expectClosed();
  });

  it('should reject connection with invalid token', async () => {
    const invalidToken = token.replace('e', 'k');
    await wsRequest(listeningServer)
      .ws('/ws?token=' + invalidToken)
      .expectClosed(1008, JSON.stringify({message: 'Unauthorized', status: 401, reason: 'Invalid token'}))
      .close()
      .expectClosed();
  });
});
