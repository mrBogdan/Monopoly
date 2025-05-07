import { Server } from 'node:http';

import request from 'supertest';

import { AppModule } from '../../../AppModule';
import { Controller, Module } from '../../../decorators';
import { Cookie, Get } from '../../../http';
import { runTestApp, TestApp } from '../runTestApp';

@Controller('/user')
class UserController {
  @Get('/cookie-test')
  getCookieTest(@Cookie('SocketId') SocketId: string) {
    return SocketId;
  }

  @Get('/cookie-test-number')
  getCookieTestNumber(@Cookie('SocketId') SocketId: number) {
    return SocketId;
  }
}

@Module({
  controllers: [UserController],
  services: [],
})
class TestModule {
}

describe('Cookie', () => {
  let listeningServer: Server;
  let app: TestApp;

  beforeAll(async () => {
    app = await runTestApp([TestModule, ...AppModule]);
    listeningServer = app.get<Server>(Server);
  });

  afterAll(async () => {
    await app.gracefulShutdown();
  });

  it('should be possible to get cookie from request', async () => {
    const expected = 'socket-id-value';
    const response = await request(listeningServer).get('/user/cookie-test').set('Cookie', `SocketId=${expected}`).send();
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected);
  });

  it('should throw BadRequestError if cookie is not exists', async () => {
    const response = await request(listeningServer).get('/user/cookie-test').send();
    expect(response.status).toBe(400);
    expect(response.body).toEqual({message: 'Bad Request', reason: 'Missing cookie: SocketId', status: 400});
  });

  it('should cast cookie to number', async () => {
    const expected = '1234567890';
    const response = await request(listeningServer).get('/user/cookie-test-number').set('Cookie', `SocketId=${expected}`).send();
    expect(response.status).toBe(200);
    expect(response.body).toEqual(Number(expected));
  })
});
