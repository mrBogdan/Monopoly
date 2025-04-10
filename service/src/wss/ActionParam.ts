import { UNKNOWN_TYPE } from '../decorators/constants';

const PARAMS_KEY = Symbol('ActionParams');

export function ActionParam(parameter: string) {
  return function (target: object, key: string | symbol, index: number) {
    const existingParams = Reflect.getMetadata(PARAMS_KEY, target, key) || [];

    const paramTypes = Reflect.getMetadata("design:paramtypes", target, key);
    const type = paramTypes[index]?.name || UNKNOWN_TYPE;

    existingParams.push({index, parameter, type});
    Reflect.defineMetadata(PARAMS_KEY, existingParams, target, key);
  }
}
