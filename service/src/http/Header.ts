import { HEADER_KEY, UNKNOWN_TYPE } from '../decorators/constants';
import { ParamInfo } from './Param';

export function Header(header: string) {
  return function (target: object, key: string, index: number) {
    const existingParams: ParamInfo[] = Reflect.getMetadata(HEADER_KEY, target, key) || [];

    const paramTypes = Reflect.getMetadata("design:paramtypes", target, key);
    const type = paramTypes[index]?.name || UNKNOWN_TYPE;

    existingParams.push({index, param: header, type});

    Reflect.defineMetadata(HEADER_KEY, existingParams, target, key);
  }
}

export const getHeaderParams = (target: object, key: string): ParamInfo[] => {
  return Reflect.getMetadata(HEADER_KEY, target, key);
}
