import { Response } from './Response';
import { capitalize } from '../nodejs/capitalize';

interface CookieParam {
  sameSite?: 'Strict' | 'Lax' | 'None';
  secure?: boolean;
  httpOnly?: boolean;
  path?: string;
  domain?: string;
  expires?: Date;
  maxAge?: number;
}

interface CookieData {
  value: string;
  cookieParam?: CookieParam;
}

const prepareCookieKey = (key: string): string => {
  if (key === 'maxAge') {
    return 'Max-Age';
  }

  return capitalize(key);
};

export class ResponseBuilder {
  private headers: Map<string, string> = new Map<string, string>();
  private cookies: Map<string, CookieData> = new Map<string, CookieData>();
  private body: unknown | File | string | object | Buffer | undefined = undefined;
  private statusCode: number = 200;

  constructor() {
  }

  setBody(body: unknown): ResponseBuilder {
    this.body = body;
    return this;
  }

  setStatusCode(statusCode: number): ResponseBuilder {
    this.statusCode = statusCode;
    return this;
  }

  setHeader(name: string, value: string): ResponseBuilder {
    this.headers.set(name, value);
    return this;
  }

  setCookie(key: string, value: string, cookieParam?: CookieParam): ResponseBuilder {
    this.cookies.set(key, {
      value,
      cookieParam,
    });
    return this;
  }

  build(): Response {
    const args = [];

    if (this.body) {
      args[0] = this.body;
    }

    if (this.cookies.size) {
      this.headers.set('Set-Cookie', Array.from(this.cookies.entries())
        .map(([cookieKey, {value, cookieParam}]) => {
          if (!cookieParam) {
            return `${cookieKey}=${value}`;
          }

          const cookieOptions = Object.entries(cookieParam)
            .filter(([, value]) => value !== undefined)
            .map(([cookieOptionKey, cookieOptionValue]) => {
              const isBoolean = typeof cookieOptionValue === 'boolean';
              const httpCookieOptionKey = prepareCookieKey(cookieOptionKey);

              if (isBoolean && cookieOptionValue) {
                return httpCookieOptionKey;
              }

              if (cookieOptionKey === 'expires' && cookieOptionValue instanceof Date) {
                return `${httpCookieOptionKey}=${cookieOptionValue.toUTCString()}`;
              }

              return `${httpCookieOptionKey}=${cookieOptionValue}`;
            })
            .join('; ');

          return `${cookieKey}=${value}; ${cookieOptions}`;
        })
        .join(', '));
    }

    if (this.headers.size) {
      args[1] = Object.fromEntries(this.headers.entries());
    }

    if (this.statusCode) {
      args[2] = this.statusCode;
    }

    return new Response(...args);
  }
}
