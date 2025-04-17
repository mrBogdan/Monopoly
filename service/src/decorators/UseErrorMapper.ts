import 'reflect-metadata';

import { ErrorMap } from '../errors/handleBusinessError';

import { ERRORS_MAP_KEY } from './constants';

export function UseErrorMapper(errorsMap: ErrorMap) {
    return <T extends { new(...args: never[]): object }>(constructor: T) => {
        Reflect.defineMetadata(ERRORS_MAP_KEY, errorsMap, constructor);
        return constructor;
    };
}

export const getErrorMapper = (target: object): ErrorMap => Reflect.getMetadata(ERRORS_MAP_KEY, target) || new Map();
