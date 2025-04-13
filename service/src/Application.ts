import { Constructor, Container } from './di';

export class Application {
  constructor(
    private readonly diContainer: Container,
    private readonly modules: Constructor<unknown>[],
  ) {
  }

  async run(startup: (container: Container) => Promise<void>): Promise<void> {
    await this.init();
    await startup(this.diContainer);
  }

  get<T>(token: Constructor<T> | string | symbol): T {
    return this.diContainer.resolve(token);
  }

  async gracefulShutdown(gracefulShutdown: (container: Container) => Promise<void>): Promise<void> {
    await gracefulShutdown(this.diContainer);
  }

  private async init() {
    await this.diContainer.init(this.modules);
    this.diContainer.register(Container, this.diContainer);
  }
}
