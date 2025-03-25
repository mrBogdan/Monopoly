import { Server } from 'node:http';
import { getHttpServer } from '../../http/getHttpServer';
import { Module } from '../../decorators/Module';
import { Controller } from '../../decorators/Controller';
import { Get } from '../../decorators/Get';
import request from 'supertest';
import { Param } from '../../decorators/Param';

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
});
