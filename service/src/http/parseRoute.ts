import 'reflect-metadata';

import { NotFoundError } from '../errors/NotFoundError';
import { getControllers } from '../decorators/Controller';
import { METHOD_KEY, PATH_KEY } from '../decorators/constants';
import { Methods } from './Methods';

const notFoundError = new NotFoundError('Handler not found');
const defaultAction = '';
const delimiter = '/';
const rootPath = '/';
const preparePath = (pathName?: string) => (!pathName ? '/' : `/${pathName}`);

const findHandler = (Controller: unknown, prototype: object, method: Methods, path: string) => {
  const handlers = Object.getOwnPropertyNames(prototype);

  for (const handler of handlers) {
    const handlerPath = Reflect.getOwnMetadata(PATH_KEY, prototype, handler);
    const handlerMethod = Reflect.getOwnMetadata(METHOD_KEY, prototype, handler);

    if (path === handlerPath && handlerMethod === method) {
      return {
        class: Controller,
        method: handler,
      };
    }
  }

  throw notFoundError;
}

export const parseRoute = (method: Methods, url: string) => {
  const controllers = getControllers();

  const splitUrl = url.split(delimiter).filter(v => v);

  if (splitUrl.length === 0) {
    const Controller = controllers.get(rootPath);

    if (!Controller) {
      throw notFoundError;
    }

    return findHandler(Controller, Controller.prototype, method, defaultAction);
  }

  if (splitUrl.length === 1) {
    const Controller = controllers.get(preparePath(splitUrl[0]));

    if (!Controller) {
      throw notFoundError;
    }

    return findHandler(Controller, Controller.prototype, method, defaultAction);
  }

  if (splitUrl.length > 1) {
    const partPath = splitUrl[0];
    const Controller = controllers.get(preparePath(partPath));

    if (!Controller) {
      throw notFoundError;
    }

    const handlers = Object.getOwnPropertyNames(Controller.prototype);

    for (const handler of handlers) {
      const handlerPath = Reflect.getOwnMetadata(PATH_KEY, Controller.prototype, handler);
      const handlerMethod = Reflect.getOwnMetadata(METHOD_KEY, Controller.prototype, handler);
      const partPath = preparePath(splitUrl[1]);

      if (handlerPath === partPath  && handlerMethod === method) {
        return {
          class: Controller,
          method: handler,
        };
      }
    }
  }

  throw notFoundError;
};
