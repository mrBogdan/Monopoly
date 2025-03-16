import { NotFoundError } from '../errors/NotFoundError';
import { getControllers } from '../decorators/Controller';
import { PATH_KEY } from '../decorators/constants';

const getHandler = (method: string, url: string) => {
  const controllers = getControllers();
  const paths: string[] = Array.from(controllers.keys());

  const splitUrl = url.split('/').filter(v => v);

  if (splitUrl.length > 1) {

    const p = `/${splitUrl.shift()}`;
    let Controller = null;

    if (paths.includes(p)) {
      Controller = controllers.get(p);
    }

    if (!Controller) {
      throw new NotFoundError('Handler not found');
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
          }
        }
      }

      throw new NotFoundError('Handler not found');
    }
  }
};
