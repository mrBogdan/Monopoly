import { Server } from 'node:http';

import request from 'supertest';

import { AppModule } from '../../../AppModule';
import { Controller, Module } from '../../../decorators';
import { Get, Header, Response } from '../../../http';
import { runTestApp, TestApp } from '../runTestApp';

@Controller('/user')
class UserController {
  @Get('/header')
  getHeader(@Header('Content-Type') contentType: string) {
    return contentType;
  }

  @Get('/header-number')
  getHeaderNumber(@Header('SomeHeader') someHeader: number) {
    return someHeader;
  }

  @Get('/response-test')
  getResponseTest(): Response {
    return Response.builder()
      .setStatusCode(301)
      .setBody({message: 'Redirecting'})
      .setCookie('cookieName', 'cookieValue')
      .setHeader('Location', 'http://example.com')
      .setHeader('Content-Type', 'application/json')
      .build();
  }
}

@Module({
  controllers: [UserController],
  services: [],
})
class TestModule {
}

describe('Header', () => {
  let listeningServer: Server;
  let app: TestApp;

  beforeAll(async () => {
    app = await runTestApp([TestModule, ...AppModule]);
    listeningServer = app.get<Server>(Server);
  });

  afterAll(async () => {
    await app.gracefulShutdown();
  });

  it('should be possible to pick a header from request', async () => {
    const expected = 'plain/text';
    const response = await request(listeningServer).get('/user/header').set('Content-Type', expected).send();
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected);
  });

  it('should throw BadRequestError if header is not exists', async () => {
    const response = await request(listeningServer).get('/user/header').send();
    expect(response.status).toBe(400);
    expect(response.body).toEqual({message: 'Bad Request', reason: 'Missing header: Content-Type', status: 400});
  });

  it('should be possible to set different status code and headers in response', async () => {
    const response = await request(listeningServer).get('/user/response-test');
    expect(response.status).toBe(301);
    expect(response.body).toEqual({message: 'Redirecting'});
    expect(response.headers['location']).toEqual('http://example.com');
    expect(response.headers['set-cookie']).toEqual(['cookieName=cookieValue']);
    expect(response.headers['content-type']).toEqual('application/json');
  });

  it('should be possible to cast header to number', async () => {
    const expected = '34522';
    const response = await request(listeningServer).get('/user/header-number').set('SomeHeader', expected).send();
    expect(response.status).toBe(200);
    expect(response.body).toEqual(Number(expected));
  });
});
