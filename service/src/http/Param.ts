import 'reflect-metadata';

import { ParamInfo, PARAMS_KEY, UNKNOWN_TYPE } from '../decorators';

export function Param(param: string) {
    return (target: object, key: string, index: number) => {
        const existingParams: ParamInfo[] = Reflect.getMetadata(PARAMS_KEY, target, key) || [];

        const paramTypes = Reflect.getMetadata('design:paramtypes', target, key);
        const type = paramTypes[index]?.name || UNKNOWN_TYPE;

        existingParams.push({index, param, type});
        Reflect.defineMetadata(PARAMS_KEY, existingParams, target, key);
    };
}

export const getParams = (target: object, key: string): ParamInfo[] => {
    return Reflect.getMetadata(PARAMS_KEY, target, key);
}
