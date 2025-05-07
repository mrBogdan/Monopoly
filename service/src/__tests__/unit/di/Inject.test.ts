import { Module } from '../../../decorators';
import { Container, Inject, Injectable } from '../../../di';

describe('Inject', () => {
  describe('Injection positive flow', () => {
    interface SuperPuper {
      someMethod(): string;
    }

    @Injectable()
    class Dependency implements SuperPuper {
      someMethod(): string {
        return 'HelloWorld';
      }
    }

    const param = 'DependencyImpl';

    class SomeService {
      constructor(@Inject(param) private someDependency: SuperPuper) {}

      public foo(): string {
        return this.someDependency.someMethod();
      }
    }

    const DependencyImpl = {
      param,
      useClass: Dependency
    };

    @Module({
      services: [SomeService, DependencyImpl]
    })
    class SomeModule {}

    it('should work', async () => {
      const container = new Container();
      await container.init([SomeModule]);

      const service= container.resolve<SomeService>(SomeService);
      const dependency = container.resolve<SuperPuper>(param);

      expect(dependency).toBeInstanceOf(Dependency);
      expect(dependency.someMethod()).toBe('HelloWorld');

      expect(service).toBeInstanceOf(SomeService);
      expect(service.foo()).toBe('HelloWorld');
    });
  });

  describe('Injection negative flow', () => {
    interface SuperPuper {
      someMethod(): string;
    }

    @Injectable()
    class Dependency implements SuperPuper {
      someMethod(): string {
        return 'HelloWorld';
      }
    }

    const param = 'DependencyImpl';

    class SomeService {
      constructor(@Inject('UNKNOWN') private someDependency: SuperPuper) {}

      public foo(): string {
        return this.someDependency.someMethod();
      }
    }

    const DependencyImpl = {
      param,
      useClass: Dependency
    };

    @Module({
      services: [SomeService, DependencyImpl]
    })
    class SomeModule {}

    it('Should throw an error if the service is not registered', async () => {
      const container = new Container();
      await expect(container.init([SomeModule])).rejects.toThrow('UNKNOWN is not resolved');
    });
  });
});
