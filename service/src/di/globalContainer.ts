import { Constructor, Container } from './Container';

let globalContainer: Container | null = null;

export const getGlobalContainer = () => {
  if (!globalContainer) {
    globalContainer = new Container();
  }

  return globalContainer;
}

export const getTestContainer = async (modules: Constructor<unknown>[]) => {
  const container = new Container();
  await container.init(modules);
  return container;
}
