import { Container } from '../../../di/Container';
import { Module } from '../../../decorators/Module';
import { Inject } from '../../../di/Inject';

class UserPublicController {
  constructor(private userService: UserService) {
  }

  public async getUser() {
    return 'user';
  }
}

interface IUserService {
  getUser(): Promise<string>;
}

class UserService implements IUserService {
  public async getUser() {
    return 'user';
  }
}

const SERVICE = 'Service';

class AdminService {
  constructor(@Inject(SERVICE) private service: IUserService) {
  }

  public async getAdmin() {
    return this.service.getUser();
  }
}

@Module({
  controllers: [UserPublicController],
  services: [UserService, {
    param: SERVICE,
    useValue: new UserService(),
  }, AdminService],
})
class UserModule {
}

const modules = [UserModule];

describe('ContainerInit', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  it('should init service', () => {
    container.init(modules);
    const userService = container.resolve(UserService);
    expect(userService).toBeInstanceOf(UserService);
    expect((userService as unknown as UserService).getUser()).resolves.toBe('user');
  });

  it('should init service with injected service', () => {
    container.init(modules);
    const adminService = container.resolve(AdminService);
    expect(adminService).toBeInstanceOf(AdminService);
    expect((adminService as unknown as AdminService).getAdmin()).resolves.toBe('user');
  });

});
