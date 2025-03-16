import { METHOD_KEY, PATH_KEY } from '../constants';
import { Methods } from '../../http/Methods';

function RequestMapping(method: string, path: string) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(PATH_KEY, path, target, propertyKey);
    Reflect.defineMetadata(METHOD_KEY, Methods.GET, target, propertyKey);
    return target;
  }
}
