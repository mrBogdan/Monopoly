import { PATH_KEY } from './constants';

const controllers = new Map();

export function Controller(path: string): ClassDecorator {
  return function (constructor: object) {
    Reflect.defineMetadata(PATH_KEY, path, constructor);
    controllers.set(path, constructor);
  };
}

export const getControllers = () => {
  return controllers;
}


