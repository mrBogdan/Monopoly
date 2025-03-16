import { PATH_KEY } from './constants';

const controllers = new Map();

export function Controller(path: string) {
  return function SimpleClassDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    Reflect.defineMetadata(PATH_KEY, path, constructor);
    controllers.set(path, constructor);
    return constructor;
  };
}

export const getControllers = () => {
  return controllers;
}


