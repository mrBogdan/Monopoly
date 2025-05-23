import 'reflect-metadata';
import {SECURE_PARAM} from './constants';

type RequestBodyParam = {
  index: number;
  param?: string;
  type: string;
}
export function Security() {
  return function (target: object, propertyKey: string) {
    Reflect.defineMetadata(SECURE_PARAM, true, target, propertyKey)

    return target;
  }
}

export const isRouteProtected = (target: object, key: string): RequestBodyParam[] => {
  return Reflect.getMetadata(SECURE_PARAM, target, key);
}
