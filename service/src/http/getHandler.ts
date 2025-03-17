import 'reflect-metadata';

import { NotFoundError } from '../errors/NotFoundError';
import { getControllers } from '../decorators/Controller';
import { PATH_KEY } from '../decorators/constants';
import { Methods } from './Methods';

const notFoundError = new NotFoundError('Handler not found');

export const getHandler = (method: Methods, url: string) => {
  const controllers = getControllers();
  const paths: string[] = Array.from(controllers.keys());

  const splitUrl = url.split('/').filter(v => v);

  if (splitUrl.length === 0) {
    const Controller = controllers.get('/') || controllers.get('');

    if (!Controller) {
      throw notFoundError;
    }

    const handlers = Object.getOwnPropertyNames(Controller.prototype);

    for (const handler of handlers) {
      const handlerPath = Reflect.getOwnMetadata(PATH_KEY, Controller.prototype, handler);

      if (handlerPath === '') {
        return {
          class: Controller,
          method: handler,
        };
      }

      throw notFoundError;
    }

    if (splitUrl.length > 1) {

      const p = `/${splitUrl.shift()}`;
      let Controller = null;

      if (paths.includes(p)) {
        Controller = controllers.get(p);
      }

      if (!Controller) {
        throw notFoundError;
      }

      for (const path of splitUrl) {
        const p = `/${path}`;

        const handlers = Object.getOwnPropertyNames(Controller.prototype);

        for (const handler of handlers) {
          const handlerPath = Reflect.getOwnMetadata(PATH_KEY, Controller.prototype, handler);

          if (handlerPath === p) {
            return {
              class: Controller,
              method: handler,
            };
          }
        }

        throw notFoundError;
      }
    }
  }
};
