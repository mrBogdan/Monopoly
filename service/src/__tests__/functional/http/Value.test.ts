import { Module } from '../../../decorators';
import { Container, Injectable, Value } from '../../../di';

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
  const container = new Container();

  beforeAll(async () => {
    await container.init([TestModule]);
  });

  it('should inject value from constructor', async () => {
    const userService = container.resolve<UserService>(UserService);
    expect(userService.getPassword()).toEqual('5442');
  });
})
