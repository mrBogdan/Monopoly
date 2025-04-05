import 'reflect-metadata';

import { REQUEST_BODY_KEY, UNKNOWN_TYPE } from '../decorators/constants';

type RequestBodyParam = {
  index: number;
  param?: string;
  type: string;
}

export function RequestBody(param?: string) {
  return function (target: object, key: string, index: number) {
    if (!Reflect.hasMetadata(REQUEST_BODY_KEY, target, key)) {
      Reflect.defineMetadata(REQUEST_BODY_KEY, [], target, key);
    }

    const existingParams = Reflect.getMetadata(REQUEST_BODY_KEY, target, key);

    const paramTypes = Reflect.getMetadata("design:paramtypes", target, key);
    const type = paramTypes[index]?.name || UNKNOWN_TYPE;

    existingParams.push({index, param, type});
    Reflect.defineMetadata(REQUEST_BODY_KEY, existingParams, target, key);
  }
}

export const getRequestBodyParams = (target: object, key: string): RequestBodyParam[] => {
  return Reflect.getMetadata(REQUEST_BODY_KEY, target, key);
}
