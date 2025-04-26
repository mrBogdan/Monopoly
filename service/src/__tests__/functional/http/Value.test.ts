import { Server } from 'node:http';

import { AppModule } from '../../../AppModule';
import { Module } from '../../../decorators';
import { Injectable, Value } from '../../../di';
import { runTestApp, TestApp } from '../runTestApp';

@Injectable({valueSource: true})
class ConfigService {
  get(key: string): unknown {
    if (key === 'password') {
      return '5442';
    }

    return undefined;
  }
}

class UserService {
  constructor(@Value('password') private password: string) {
  }

  getPassword() {
    return this.password;
  }
}


@Module({
  services: [UserService, ConfigService],
})
class TestModule {
}


describe('Value', () => {
  let app: TestApp;

  beforeAll(async () => {
    app = await runTestApp([TestModule, ...AppModule]);
  });

  afterAll(async () => {
    await app.gracefulShutdown();
  });

  it('should inject value from constructor', async () => {
    const userService = app.get<UserService>(UserService);
    expect(userService.getPassword()).toEqual('5442');
  });
})
