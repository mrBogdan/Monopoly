import { Server } from 'node:http';

import request from 'supertest';

import { AppModule } from '../../../AppModule';
import { Controller, Module } from '../../../decorators';
import { Post, RequestBody } from '../../../http';
import { runTestApp, TestApp } from '../runTestApp';

const USER_1 = 'USER_1';

class SimpleUser {
  public id: string = USER_1;
}

@Controller('/user')
class UserController {
  @Post()
  createUser(@RequestBody() user: SimpleUser) {
    return user;
  }

  @Post('/set-age')
  createUserWithParam(@RequestBody('age') age: number) {
    return {age};
  }
}

@Module({
  controllers: [UserController],
})
class TestModule {
}

describe('Request Body', () => {
  let listeningServer: Server;
  let app: TestApp;

  beforeAll(async () => {
    app = await runTestApp([TestModule, ...AppModule]);
    listeningServer = app.get<Server>(Server);
  });

  afterAll(async () => {
    await app.gracefulShutdown();
  });

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
