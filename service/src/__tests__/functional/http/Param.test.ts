import { Server } from 'node:http';

import request from 'supertest';

import { AppModule } from '../../../AppModule';
import { Controller, Module } from '../../../decorators';
import { Get, Param } from '../../../http';
import { runTestApp, TestApp } from '../runTestApp';

const USER_1 = 'USER_1';

class UserService {
  getUserById(id: string) {
    return [USER_1].find(user => user === id);
  }
}

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
}

@Module({
  controllers: [UserController],
  services: [UserService],
})
class TestModule {
}

describe('Param', () => {
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

  it('should cast param to number', async () => {
    const response = await request(listeningServer).get('/user/number-param/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(1);
    expect(typeof response.body).toBe('number');
  });
});
