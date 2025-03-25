import { Server } from 'node:http';
import { getHttpServer } from '../../http/getHttpServer';
import { Module } from '../../decorators/Module';
import { Controller } from '../../decorators/Controller';
import { Get } from '../../decorators/Get';
import request from 'supertest';
import { Param } from '../../decorators/Param';
import { UseErrorMapper } from '../../decorators/UseErrorMapper';
import { BadRequestError } from '../../errors/BadRequestError';
import { QueryParam } from '../../decorators/QueryParam';

const USER_1 = 'USER_1';

class UserService {
  getUserById(id: string) {
    return [USER_1].find(user => user === id);
  }
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
}

@Module({
  controllers: [UserController],
  services: [UserService],
})
class TestModule {}

describe('Http server framework tests', () => {
  let listeningServer: Server;

  beforeEach(async () => {
    const server = getHttpServer([TestModule]);
    listeningServer = server.listen(0);
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
});
