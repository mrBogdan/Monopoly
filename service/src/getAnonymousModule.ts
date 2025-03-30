import { Module } from './decorators/Module';

export const getAnonymousModule = (controllers?: unknown[], services?: unknown[]) => {
  @Module({
    services,
    controllers,
  })
  class AnonymousModule {}

  return AnonymousModule;
}
