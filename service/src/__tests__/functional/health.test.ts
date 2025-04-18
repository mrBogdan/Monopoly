import { Server } from 'node:http';

import request from 'supertest';
import wsRequest from 'superwstest';

import { HealthModule } from '../../health/HealthModule';
import { getTestConfig } from '../../nodejs/getTestConfig';
import { Secure } from '../../secure';

import { getTestConfigModule } from './getTestConfigModule';
import { runTestApp } from './runTestApp';

describe('Health', () => {
  let listeningServer: Server;
  let secure: Secure;
  let token: string;

  beforeEach(async () => {
    const app = await runTestApp([HealthModule, getTestConfigModule(getTestConfig())]);
    secure = app.get<Secure>(Secure);
    token = secure.encode({id: 'test'});
    listeningServer = app.get<Server>(Server);
  });

  afterEach(() => {
    listeningServer.close();
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
      .ws(`/ws?token=${token}`)
      .sendJson({type: 'ping'})
      .expectJson({type: 'ping', message: 'pong'})
      .close()
      .expectClosed();
  });

  it('should return 404 on ws type not found', async () => {
    const type = 'incorrect-type';
    await wsRequest(listeningServer)
      .ws(`/ws?token=${token}`)
      .sendJson({type})
      .expectJson({message: 'Not Found', status: 404, reason: `Hub "${type}" not found`})
      .close()
      .expectClosed();
  });
});
