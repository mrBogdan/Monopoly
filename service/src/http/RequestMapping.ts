import 'reflect-metadata';

import { METHOD_KEY, PATH_KEY } from '../decorators/constants';

import { Methods } from './Methods';

export function RequestMapping(path: string = '', method: Methods = Methods.GET) {
  return function (target: object, propertyKey: string) {
    Reflect.defineMetadata(PATH_KEY, path, target, propertyKey);
    Reflect.defineMetadata(METHOD_KEY, method, target, propertyKey);
    return target;
  }
}
