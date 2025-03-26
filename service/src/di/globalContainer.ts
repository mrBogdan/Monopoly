import { Container } from './Container';

let globalContainer: Container | null = null;

export const getGlobalContainer = () => {
  if (!globalContainer) {
    globalContainer = new Container();
  }

  return globalContainer;
}

export const setGlobalContainer = (container: Container) => {
  globalContainer = container;
}
