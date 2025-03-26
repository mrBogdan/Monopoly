/* eslint-disable @typescript-eslint/no-explicit-any */
import {getGlobalContainer} from '../di/globalContainer';

type ModuleParams = {
  controllers: any[];
  services?: any[];
}

export function Module(module: ModuleParams) {
  return function <T extends { new(...args: never[]): object }>(constructor: T) {
    const container = getGlobalContainer();
    module?.services?.forEach((service) => container.register(service));
    module.controllers.forEach((controller) => container.register(controller));
    return constructor;
  };
}
