import 'reflect-metadata';

import { NotFoundError } from '../errors/NotFoundError';
import { getControllers } from '../decorators/Controller';
import { PATH_KEY } from '../decorators/constants';
import { Methods } from './Methods';

const notFoundError = new NotFoundError('Handler not found');

export const getHandler = (method: Methods, url: string) => {
  const controllers = getControllers();

  const splitUrl = url.split('/').filter(v => v);

  if (splitUrl.length === 0) {
    const Controller = controllers.get('/') || controllers.get('');

    if (!Controller) {
      throw notFoundError;
    }

    const handlers = Object.getOwnPropertyNames(Controller.prototype);
    const action = ['', '/'];

    for (const handler of handlers) {
      const handlerPath = Reflect.getOwnMetadata(PATH_KEY, Controller.prototype, handler);

      if (action.includes(handlerPath)) {
        return {
          class: Controller,
          method: handler,
        };
      }
    }
  }

  if (splitUrl.length === 1) {
    const Controller = controllers.get(`/${splitUrl.shift()}`);

    if (!Controller) {
      throw notFoundError;
    }

    const handlers = Object.getOwnPropertyNames(Controller.prototype);
    const action = ['', '/'];

    for (const handler of handlers) {
      const handlerPath = Reflect.getOwnMetadata(PATH_KEY, Controller.prototype, handler);

      if (action.includes(handlerPath)) {
        return {
          class: Controller,
          method: handler,
        };
      }
    }
  }

  if (splitUrl.length > 1) {

    const controller = `/${splitUrl.shift()}`;
    let Controller = controllers.get(controller);

    if (!Controller) {
      throw notFoundError;
    }

    const action = `/${splitUrl.shift()}`;

    const handlers = Object.getOwnPropertyNames(Controller.prototype);

    for (const handler of handlers) {
      const handlerPath = Reflect.getOwnMetadata(PATH_KEY, Controller.prototype, handler);

      if (handlerPath === action) {
        return {
          class: Controller,
          method: handler,
        };
      }
    }
  }

  throw notFoundError;
};
