/* eslint-disable @typescript-eslint/no-explicit-any */
import { globalContainer } from '../di/Container';

type ModuleParams = {
  controllers: any[];
  services?: any[];
}

export function Module(module: ModuleParams) {
  return function <T extends { new(...args: never[]): object }>(constructor: T) {
    module?.services?.forEach((service) => globalContainer.register(service));
    module.controllers.forEach((controller) => globalContainer.register(controller));
    return constructor;
  };
}
