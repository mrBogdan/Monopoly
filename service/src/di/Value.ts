import { ParamInfo, UNKNOWN_TYPE } from '../decorators';

const valueParam = Symbol('valueParam');

export function Value(value: string): ParameterDecorator {
  return function (target: object, key: string | symbol | undefined, index: number) {
    if (key) {
      throw new Error('Value decorator can only be used for constructor parameters');
    }

    const existingValueParams: ParamInfo[] = Reflect.getMetadata(valueParam, target) || [];

    const valueTypes = Reflect.getMetadata('design:paramtypes', target);
    const type = valueTypes[index]?.name || UNKNOWN_TYPE;

    existingValueParams.push({ index, param: value, type });
    Reflect.defineMetadata(valueParam, existingValueParams, target);
  };
}

export const getValueParams = (target: object): ParamInfo[] => {
  return Reflect.getMetadata(valueParam, target) || [];
}
