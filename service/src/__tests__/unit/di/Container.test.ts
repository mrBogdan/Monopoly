import { Container } from '../../../di';

class UserController {
  constructor() {
    console.log('UserController created');
  }
}

class HealthController {
  constructor() {
    console.log('HealthController created');
  }
}

class UserService {
  constructor() {
    console.log('UserService created');
  }
}

class FollowController {
  constructor(private userService: UserService) {
    console.log('FollowController created');
  }
}

describe('Container tests', () => {
  it('should not register the service twice', () => {
    const container = new Container();

    container.register(UserController);
    container.register(HealthController);

    expect(container.resolve(UserController)).toBeInstanceOf(UserController);
    expect(container.resolve(HealthController)).toBeInstanceOf(HealthController);
  });

  it('should resolve dependencies', () => {
    const container = new Container();
    container.register(UserController);
    container.register(HealthController);

    const userController = container.resolve(UserController);
    const healthController = container.resolve(HealthController);

    expect(userController).toBeInstanceOf(UserController);
    expect(healthController).toBeInstanceOf(HealthController);
  });

  it('should throw an error when service is not found', () => {
    const container = new Container();

    expect(() => container.resolve('UnknownService')).toThrow('Service UnknownService not found');
  });

  it('should resolve dependencies', () => {
    const container = new Container();
    container.register(UserService);
    container.register(FollowController);

    const followController = container.resolve(FollowController);

    expect(followController).toBeInstanceOf(FollowController);
  });
});
