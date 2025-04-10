import { getControllers } from './Controller';
import { METHOD_KEY, PATH_KEY } from './constants';
import { delimiter } from '../http/router/constants';
import { Methods } from '../http';

export const buildRoutes = (callback: (path: string, method: Methods, Class: unknown, action: string) => void) => {
  const controllers = getControllers();

  controllers.forEach((Controller, path) => {
    Reflect.ownKeys(Controller.prototype).forEach((action) => {
      const route: string = Reflect.getMetadata(PATH_KEY, Controller.prototype, action.toString());
      const method: Methods = Reflect.getMetadata(METHOD_KEY, Controller.prototype, action.toString());

      if (route !== undefined && method !== undefined) {
        callback([path, route].join(delimiter), method, Controller, action.toString());
      }
    });
  });
}
