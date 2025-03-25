/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';

import { QUERY_PARAM_KEY, UNKNOWN_TYPE } from './constants';
import { ParamInfo } from './Param';

export function QueryParam(param: string) {
    return (target: any, key: string, index: number) => {
        if (!Reflect.hasMetadata(QUERY_PARAM_KEY, target, key)) {
            Reflect.defineMetadata(QUERY_PARAM_KEY, [], target, key);
        }

        const existingParams = Reflect.getMetadata(QUERY_PARAM_KEY, target, key);

        const paramTypes = Reflect.getMetadata("design:paramtypes", target, key);
        const type = paramTypes[index]?.name || UNKNOWN_TYPE;

        existingParams.push({index, param, type});
        Reflect.defineMetadata(QUERY_PARAM_KEY, existingParams, target, key);
    };
}

export const getQueryParams = (target: any, key: string): ParamInfo[] => {
    return Reflect.getMetadata(QUERY_PARAM_KEY, target, key);
}
