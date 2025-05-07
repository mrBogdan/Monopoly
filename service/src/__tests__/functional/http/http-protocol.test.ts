import { Server } from 'node:http';

import request from 'supertest';

import { AppModule } from '../../../AppModule';
import { Controller, Module, UseErrorMapper } from '../../../decorators';
import { BadRequestError } from '../../../errors';
import { Get, Param } from '../../../http';
import { runTestApp, TestApp } from '../runTestApp';

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

  @Get('/hi')
  getUser() {
    return 'Hello, there!';
  }

  @Get('/@id')
  getUserById(@Param('id') id: string) {
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

  @Get('/unknown-error')
  getUnknownError() {
    throw new Error('Unknown error');
  }
}

@Module({
  controllers: [UserController],
  services: [UserService],
})
class TestModule {
}

describe('Http Protocol', () => {
  let listeningServer: Server;
  let app: TestApp;

  beforeAll(async () => {
    app = await runTestApp([TestModule, ...AppModule]);
    listeningServer = app.get<Server>(Server);
  });

  afterAll(async () => {
    await app.gracefulShutdown();
  });

  it('should return user by id', async () => {
    const response = await request(listeningServer).get('/user/USER_1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(USER_1);
  });

  it('should return number param', async () => {
    const response = await request(listeningServer).get('/user/number-param/123');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(123);
  });

  it('should throw business error', async () => {
    const response = await request(listeningServer).get('/user/business-error');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({'message': 'Bad Request', 'reason': 'Some business error', 'status': 400});
  });

  it('should throw internal server error', async () => {
    const response = await request(listeningServer).get('/user/unknown-error');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({'message': 'Internal Server Error', 'reason': '', 'status': 500});
  });
})
