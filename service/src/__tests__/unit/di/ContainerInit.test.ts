import { Container } from '../../../di/Container';
import { Module } from '../../../decorators/Module';
import { Inject } from '../../../di/Inject';
import { Injectable } from '../../../di/Injectable';

describe('ContainerInit', () => {
  describe('Simple auto injection', () => {
    @Injectable()
    class UserService {
      public async getUser() {
        return 'user';
      }
    }

    @Module({
      services: [UserService],
    })
    class SimpleModule {
    }

    it('should inject service', async () => {
      const container = new Container();
      await container.init([SimpleModule]);
      const userService = container.resolve<UserService>(UserService);
      expect(userService).toBeInstanceOf(UserService);
      expect(await userService.getUser()).toBe('user');
    });
  });

  describe('Should register  dependencies in Module decorator', () => {
    class UserRepository {
      public async getUser() {
        return 'user';
      }
    }

    class UserService {
      constructor(private userRepository: UserRepository) {
      }

      public async getUser() {
        return this.userRepository.getUser();
      }
    }

    @Module({
      services: [UserService],
    })
    class SimpleModule {
    }

    it('should throw error for resolving sub dependency without decorator', async () => {
      const container = new Container();
      await container.init([SimpleModule]);

      expect(() => container.resolve(UserRepository)).toThrow('Service UserRepository not found');
    });
  });

  describe('Should resolve sub dependencies', () => {
    @Injectable()
    class UserRepository {
      public async getUser() {
        return 'user';
      }
    }

    @Injectable()
    class UserService {
      constructor(private userRepository: UserRepository) {
      }

      public async getUser() {
        return this.userRepository.getUser();
      }
    }

    @Module({
      services: [UserService, UserRepository],
    })
    class SimpleModule {
    }

    it('should resolve sub dependencies', async () => {
      const container = new Container();
      await container.init([SimpleModule]);
      const userService = container.resolve<UserService>(UserService);
      const userRepository = container.resolve<UserRepository>(UserRepository);
      expect(userService).toBeInstanceOf(UserService);
      expect(userRepository).toBeInstanceOf(UserRepository);
      expect(await userService.getUser()).toBe('user');
    });
  });

  describe('Should be possible to inject service in another service', () => {
    const param = 'UserRepository';

    interface UserRepository {
      getUser(): Promise<string>;
    }

    @Injectable()
    class ConcreteUserRepository implements UserRepository {
      public async getUser() {
        return 'user';
      }
    }

    @Injectable()
    class UserService {
      constructor(@Inject(param) private userRepository: UserRepository) {
      }

      public async getUser() {
        return this.userRepository.getUser();
      }
    }

    @Module({
      services: [UserService, {param, useClass: ConcreteUserRepository}],
    })
    class SimpleModule {
    }

    it('should inject service in another service', async () => {
      const container = new Container();
      await container.init([SimpleModule]);
      const userService = container.resolve<UserService>(UserService);
      const userRepository = container.resolve<UserRepository>(param);
      expect(userService).toBeInstanceOf(UserService);
      expect(userRepository).toBeInstanceOf(ConcreteUserRepository);
      expect(await userService.getUser()).toBe('user');
    });
  });

  describe('Should be possible to inject async dependencies', () => {
    class Db {
      private connected = false;

      async connect() {
        return new Promise((resolve) => {
          setTimeout(() => {
            this.connected = true;
            resolve('db');
          }, 22);
        });
      }

      async query() {
        if (!this.connected) {
          throw new Error('Not connected');
        }
        return 'query'
      }
    }

    @Injectable()
    class UserRepository {
      constructor(private db: Db) {
      }

      public async getUser() {
        return this.db.query();
      }
    }

    @Injectable()
    class UserService {
      constructor(private userRepository: UserRepository) {
      }

      public async getUser() {
        return this.userRepository.getUser();
      }
    }

    @Module({
      services: [UserService, UserRepository, {
        param: Db, useFactory: async () => {
          const db = new Db();
          await db.connect();
          return db;
        },
      }],
    })
    class SimpleModule {}

    it('should inject async dependencies', async () => {
      const container = new Container();
      await container.init([SimpleModule]);
      const userService = container.resolve<UserService>(UserService);
      const repository = container.resolve<UserRepository>(UserRepository);
      const db = container.resolve<Db>(Db);
      expect(userService).toBeInstanceOf(UserService);
      expect(db).toBeInstanceOf(Db);
      expect(repository).toBeInstanceOf(UserRepository);
      expect(await userService.getUser()).toBe('query');
    });
  });

  describe('Should be possible to inject simple value', () => {
    @Injectable()
    class UserRepository {
      constructor(@Inject('db') private db: string) {
      }

      public async getUser() {
        return this.db;
      }
    }

    @Module({
      services: [UserRepository, {param: 'db', useValue: 'db'}],
    })
    class SimpleModule {}

    it('should inject simple value', async () => {
      const container = new Container();
      await container.init([SimpleModule]);
      const repository = container.resolve<UserRepository>(UserRepository);
      expect(repository).toBeInstanceOf(UserRepository);
      expect(await repository.getUser()).toBe('db');
    });
  })

});
