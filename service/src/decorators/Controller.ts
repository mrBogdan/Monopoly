import { PATH_KEY } from './constants';

const controllers = new Map();

export function Controller(path: string) {
  return function <T extends { new(...args: never[]): object }>(constructor: T) {
    Reflect.defineMetadata(PATH_KEY, path, constructor);
    controllers.set(path, constructor);
    return constructor;
  };
}

export const getControllers = () => {
  return controllers;
}


