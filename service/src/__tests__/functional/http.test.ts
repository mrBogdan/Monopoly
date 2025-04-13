import { Server } from 'node:http';
import request from 'supertest';

import { Module } from '../../decorators/Module';
import { Controller } from '../../decorators/Controller';
import { Get } from '../../decorators/Get';
import { Param } from '../../decorators/Param';
import { UseErrorMapper } from '../../decorators/UseErrorMapper';
import { BadRequestError } from '../../errors/BadRequestError';
import { QueryParam } from '../../decorators/QueryParam';
import { Post } from '../../decorators/Post';
import { RequestBody } from '../../decorators/RequestBody';
import { Header } from '../../decorators/Header';
import { runTestApp } from './runTestApp';
import { getTestConfigModule } from './getTestConfigModule';
import { getTestConfig } from '../../nodejs/getTestConfig';
import {Response} from '../../http/Response';

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

  @Get('query-param-and-path-param/@id')
  getQueryParamAndPathParam(@QueryParam('query') query: string, @Param('id') id: string) {
    return { query, id };
  }

  @Post()
  createUser(@RequestBody() user: SimpleUser) {
    return user;
  }

  @Post('/set-age')
  createUserWithParam(@RequestBody('age') age: number) {
    return { age };
  }

  @Get('/header')
  getHeader(@Header('Content-Type') contentType: string) {
    return contentType;
  }

  @Get('/response-test')
  getResponseTest(): Response {
    return Response.builder()
      .setStatusCode(301)
      .setBody({ message: 'Redirecting' })
      .setCookie('cookieName', 'cookieValue')
      .setHeader('Location', 'http://example.com')
      .setHeader('Content-Type', 'application/json')
      .build();
  }
}

@Module({
  controllers: [UserController],
  services: [UserService],
})
class TestModule {}

describe('Http server framework tests', () => {
  let listeningServer: Server;

  beforeEach(async () => {
    const app = await runTestApp([TestModule, getTestConfigModule(getTestConfig())]);
    listeningServer = app.get<Server>(Server);
  });

  afterEach(() => {
    listeningServer.close();
  });

  it('should return user by id', async () => {
    const response = await request(listeningServer).get('/user/USER_1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(USER_1);
  });

  it('should handle error with error mapper', async () => {
    const response = await request(listeningServer).get('/user/business-error');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Bad Request', reason: 'Some business error', status: 400 });
  });

  it('should cast param to number', async () => {
    const response = await request(listeningServer).get('/user/number-param/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(1);
    expect(typeof response.body).toBe('number');
  });

  it('should return query param', async () => {
    const response = await request(listeningServer).get('/user/query-param?query=hello');
    expect(response.status).toBe(200);
    expect(response.body).toEqual('hello');
  });

  it('should be possible to use query param and path param together', async () => {
    const response = await request(listeningServer).get('/user/query-param-and-path-param/some-id?query=hello');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ query: 'hello', id: 'some-id' });
  });

  it('should throw BadRequestError if query param is not passed', async () => {
    const response = await request(listeningServer).get('/user/query-param');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Bad Request', reason: 'Missing query parameter: query', status: 400 });
  });

  it('should correctly handle POST request', async () => {
    const expected = { id: 'USER_1' };
    const response = await request(listeningServer).post('/user').send(expected);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected);
  });

  it('should be possible to pick a param from request body', async () => {
    const expected = { age: 25 };
    const response = await request(listeningServer).post('/user/set-age').send(expected);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected);
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
    expect(response.body).toEqual({ message: 'Bad Request', reason: 'Missing header: Content-Type', status: 400 });
  });

  it('should be possible to set different status code and headers in response', async () => {
    const response = await request(listeningServer).get('/user/response-test');
    expect(response.status).toBe(301);
    expect(response.body).toEqual({ message: 'Redirecting' });
    expect(response.headers['location']).toEqual('http://example.com');
    expect(response.headers['set-cookie']).toEqual(['cookieName=cookieValue']);
    expect(response.headers['content-type']).toEqual('application/json');
  })
});
