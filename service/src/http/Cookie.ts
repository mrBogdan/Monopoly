import { COOKIES_KEY, UNKNOWN_TYPE } from '../decorators/constants';
import { ParamInfo } from './Param';

export function Cookie(cookie: string) {
  return function (target: object, key: string, index: number) {
    const existingCookies: ParamInfo[] = Reflect.getMetadata(COOKIES_KEY, target, key) || [];

    const cookieTypes = Reflect.getMetadata('design:paramtypes', target, key);
    const type = cookieTypes[index]?.name || UNKNOWN_TYPE;

    existingCookies.push({ index, param: cookie, type });
    Reflect.defineMetadata(COOKIES_KEY, existingCookies, target, key);
  }
}

export const getCookieParams = (target: object, key: string): ParamInfo[] | undefined => {
  return Reflect.getMetadata(COOKIES_KEY, target, key);
}
