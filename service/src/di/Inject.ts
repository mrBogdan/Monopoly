import 'reflect-metadata';
import { INJECT_PARAM } from './constants';

export type InjectParams = {
  index: number;
  token: string | symbol;
}

export function Inject(token: string | symbol): ParameterDecorator {
  return function (target: object, key: string | symbol | undefined, index: number) {
    if (key) {
      throw new Error('Inject decorator can only be used for constructor parameters');
    }

    const existingInjectParams: InjectParams[] = Reflect.getMetadata(INJECT_PARAM, target) || [];
    existingInjectParams.push({index, token});
    Reflect.defineMetadata(INJECT_PARAM, existingInjectParams, target);
  };
}

export const getInjectParams = (target: object): InjectParams[] => {
  return Reflect.getMetadata(INJECT_PARAM, target) || [];
}
