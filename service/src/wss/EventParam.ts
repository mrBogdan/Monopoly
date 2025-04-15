import { UNKNOWN_TYPE } from '../decorators/constants';
import { ClassInstance, ParamInfo } from '../http';

const PARAMS_KEY = Symbol('ActionParams');

export function EventParam(param: string) {
  return function (target: object, key: string | symbol, index: number) {
    const existingParams = Reflect.getMetadata(PARAMS_KEY, target, key) || [];

    const paramTypes = Reflect.getMetadata("design:paramtypes", target, key);
    const type = paramTypes[index]?.name || UNKNOWN_TYPE;

    existingParams.push({index, param, type});
    Reflect.defineMetadata(PARAMS_KEY, existingParams, target, key);
  }
}

export const getActionParams = (instance: ClassInstance, method: string): ParamInfo[] => {
  return Reflect.getMetadata(PARAMS_KEY, instance, method);
}
