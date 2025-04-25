import { Server } from 'node:http';

import request from 'supertest';

import { AppModule } from '../../AppModule';
import { Controller, Module, UseErrorMapper } from '../../decorators';
import { BadRequestError } from '../../errors';
import { Cookie, Get, Header, Param, Post, QueryParam, RequestBody, Response } from '../../http';

import { runTestApp, TestApp } from './runTestApp';


const USER_1 = 'USER_1';

class UserService {
  getUserById(id: string) {
    return [USER_1].find(user => user === id);
  }
}

class SimpleUser {
  public id: string = USER_1;
}

class SomeBusinessError extends Error {
  constructor() {
    super('Some business error');
  }
}

@UseErrorMapper(new Map([
  [SomeBusinessError, BadRequestError],
]))
@Controller('/user')
class UserController {
  constructor(private userService: UserService) {
  }

  @Get('/@id')
  getUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get('/number-param/@id')
  getNumberParam(@Param('id') id: number) {
    return id;
  }

  @Get('/business-error')
  getBusinessError() {
    throw new SomeBusinessError();
  }

  @Get('query-param')
  getQueryParam(@QueryParam('query') query: string) {
    return query;
  }

  @Get('query-param-number')
  getQueryParamNumber(@QueryParam('query') query: number) {
    return query;
  }

  @Get('query-param-and-path-param/@id')
  getQueryParamAndPathParam(@QueryParam('query') query: string, @Param('id') id: string) {
    return {query, id};
  }

  @Post()
  createUser(@RequestBody() user: SimpleUser) {
    return user;
  }

  @Post('/set-age')
  createUserWithParam(@RequestBody('age') age: number) {
    return {age};
  }

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
  services: [UserService],
})
class TestModule {
}

describe('Http server framework tests', () => {
  let listeningServer: Server;
  let app: TestApp;

  beforeAll(async () => {
    app = await runTestApp([TestModule, ...AppModule]);
    listeningServer = app.get<Server>(Server);
  });

  afterAll(async () => {
    await app.gracefulShutdown();
  });

  describe('Param', () => {
    it('should return user by id', async () => {
      const response = await request(listeningServer).get('/user/USER_1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(USER_1);
    });

    it('should handle error with error mapper', async () => {
      const response = await request(listeningServer).get('/user/business-error');
      expect(response.status).toBe(400);
      expect(response.body).toEqual({message: 'Bad Request', reason: 'Some business error', status: 400});
    });

    it('should cast param to number', async () => {
      const response = await request(listeningServer).get('/user/number-param/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(1);
      expect(typeof response.body).toBe('number');
    });
  })

  describe('Query param', () => {
    it('should return query param', async () => {
      const response = await request(listeningServer).get('/user/query-param?query=hello');
      expect(response.status).toBe(200);
      expect(response.body).toEqual('hello');
    });

    it('should be possible to use query param and path param together', async () => {
      const response = await request(listeningServer).get('/user/query-param-and-path-param/some-id?query=hello');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({query: 'hello', id: 'some-id'});
    });

    it('should throw BadRequestError if query param is not passed', async () => {
      const response = await request(listeningServer).get('/user/query-param');
      expect(response.status).toBe(400);
      expect(response.body).toEqual({message: 'Bad Request', reason: 'Missing query parameter: query', status: 400});
    });

    it('should cast query param to number', async () => {
      const response = await request(listeningServer).get('/user/query-param-number?query=123');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(123);
      expect(typeof response.body).toBe('number');
    });
  });

  describe('Request Body', () => {
    it('should correctly handle POST request', async () => {
      const expected = {id: 'USER_1'};
      const response = await request(listeningServer).post('/user').send(expected);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expected);
    });

    it('should be possible to pick a param from request body', async () => {
      const expected = {age: 25};
      const response = await request(listeningServer).post('/user/set-age').send(expected);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expected);
    });
  });

  describe('Header', () => {
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

  describe('Cookie', () => {
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
});
