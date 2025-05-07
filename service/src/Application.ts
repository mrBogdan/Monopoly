import { Constructor, Container } from './di';

export class Application {
  constructor(
    private readonly container: Container,
    private readonly modules: Constructor[],
  ) {
  }

  async run(startup: (container: Container) => Promise<void>): Promise<void> {
    await this.init();
    await startup(this.container);
  }

  get<T>(token: Constructor | string | symbol): T {
    return this.container.resolve(token);
  }

  async gracefulShutdown(gracefulShutdown: (container: Container) => Promise<void>): Promise<void> {
    await gracefulShutdown(this.container);
  }

  private async init() {
    await this.container.init(this.modules);
  }
}
