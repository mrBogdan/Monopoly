import { Constructor, Container } from './di/Container';

export class Application {
  private isInitialized = false;

  constructor(
    private readonly diContainer: Container,
    private readonly modules: Constructor<unknown>[],
  ) {
  }

  async init() {
    await this.diContainer.init(this.modules);
    this.diContainer.register(Container, this.diContainer);
    this.isInitialized = true;
  }

  async run(startup: (container: Container) => Promise<void>): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('Application not initialized. Please run Application::init()');
    }

    await startup(this.diContainer);
  }

  get<T>(token: Constructor<T> | string | symbol): T {
    return this.diContainer.resolve(token);
  }

  async gracefulShutdown() {
  }
}
