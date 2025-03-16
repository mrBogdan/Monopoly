import { Methods } from '../http/Methods';
import { METHOD_KEY, PATH_KEY } from './constants';

export function RequestMapping(method: Methods, path: string) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(PATH_KEY, path, target, propertyKey);
    Reflect.defineMetadata(METHOD_KEY, method, target, propertyKey);
    return target;
  }
}
