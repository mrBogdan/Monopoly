/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';

import { PARAMS_KEY, UNKNOWN_TYPE } from './constants';

export type ParamInfo = {
    index: number;
    param: string;
    type: string;
}

export function Param(param: string) {
    return (target: any, key: string, index: number) => {
        if (!Reflect.hasMetadata(PARAMS_KEY, target, key)) {
            Reflect.defineMetadata(PARAMS_KEY, [], target, key);
        }

        const existingParams = Reflect.getMetadata(PARAMS_KEY, target, key);

        const paramTypes = Reflect.getMetadata("design:paramtypes", target, key);
        const type = paramTypes[index]?.name || UNKNOWN_TYPE;

        existingParams.push({index, param, type});
        Reflect.defineMetadata(PARAMS_KEY, existingParams, target, key);
    };
}

export const getParams = (target: any, key: string): ParamInfo[] => {
    return Reflect.getMetadata(PARAMS_KEY, target, key);
}
