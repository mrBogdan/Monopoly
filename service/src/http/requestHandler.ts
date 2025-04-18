import http from 'node:http';
import { parse } from 'node:url';

import { getCookieParams } from '../decorators/Cookie';
import { getHeaderParams } from '../decorators/Header';
import { getParams } from '../decorators/Param';
import { getQueryParams } from '../decorators/QueryParam';
import { getRequestBodyParams } from '../decorators/RequestBody';
import { getErrorMapper } from '../decorators/UseErrorMapper';
import { Container } from '../di/Container';
import { BadRequestError } from '../errors/BadRequestError';
import { handleBusinessError } from '../errors/handleBusinessError';
import { handleProtocolError } from '../errors/handleProtocolError';
import { toJsonError } from '../errors/toJsonError';

import { Headers } from './headers';
import { isMethodWithBody, Methods } from './Methods';
import { parseRequestBody } from './parseRequestBody';
import { Response } from './Response';
import { Router } from './router/Router';



type RequestContext = {
  body?: unknown;
  params?: Map<string, string>;
  query?: Record<string, string>;
  headers?: Record<string, string>;
};

type ClassInstance = {[key: string]: CallableFunction};

export const requestHandler = (router: Router, diContainer: Container) => async (req: http.IncomingMessage, res: http.ServerResponse) => {
  let handler;
  try {
    const url = parse(req.url ?? '', true);
    const route = router.findRoute(url.pathname ?? '', req.method?.toUpperCase() as Methods);

    handler = route.handler();
    const instance = diContainer.resolve<ClassInstance>(handler.controller());
    const body = isMethodWithBody(req.method?.toUpperCase() as Methods) ? await parseRequestBody(req) : undefined;
    const response = await executeHandler(instance, handler.action(), {
      body,
      query: url?.query as Record<string, string>,
      params: route.getParams(),
      headers: req.headers as Record<string, string>,
    });
    const contentType = response.headers?.['Content-Type'] || Headers.ContentType.json['Content-Type'];
    res.writeHead(response.statusCode ?? 200, response.headers ?? Headers.ContentType.json);
    res.end(prepareResponseBody(response.body, contentType));
  } catch (error) {
    console.error(error);

    const protocolError = handleProtocolError(error);

    if (protocolError) {
      res.writeHead(protocolError.status, Headers.ContentType.json);
      res.end(toJsonError(protocolError));
      return;
    }

    const responseError = handleBusinessError(error, getErrorMapper(handler?.controller()));

    res.writeHead(responseError.status, Headers.ContentType.json);
    res.end(toJsonError(responseError));
  }
};

const executeHandler = async (instance: ClassInstance, method: string, requestContext: RequestContext): Promise<Response> => {
  const params = getParams(instance, method);
  const queryParams = getQueryParams(instance, method);
  const requestBodyParams = getRequestBodyParams(instance, method);
  const headerParams = getHeaderParams(instance, method);
  const cookieParams = getCookieParams(instance, method);

  const args = [];

  if (params) {
    for (const param of params) {
      const paramValue = requestContext.params?.get(param.param);

      if (!paramValue) {
        throw new BadRequestError(`Missing parameter: ${param.param}`);
      }

      args[param.index] = castToType(paramValue, param.type);
    }
  }

  if (queryParams) {
    for (const param of queryParams) {
      const queryParam = requestContext?.query?.[param.param];

      if (!queryParam) {
        throw new BadRequestError(`Missing query parameter: ${param.param}`);
      }

      args[param.index] = castToType(queryParam, param.type);
    }
  }

  if (requestBodyParams) {
    if (!requestContext?.body) {
      throw new BadRequestError('Request Body is missing');
    }

    for (const param of requestBodyParams) {
      if (param.param) {
        const bodyValue = (requestContext.body as Record<string, unknown>)[param.param];

        if (!bodyValue) {
          throw new BadRequestError(`Missing body parameter: ${param.param}`);
        }

        args[param.index] = castToType(bodyValue, param.type);
      } else {
        args[param.index] = requestContext.body;
      }
    }
  }

  if (headerParams) {
    for (const headerParam of headerParams) {
      const headerValue = requestContext?.headers?.[headerParam?.param?.toLowerCase()];

      if (!headerValue) {
        throw new BadRequestError(`Missing header: ${headerParam.param}`);
      }

      args[headerParam.index] = castToType(headerValue, headerParam.type);
    }
  }

  if (cookieParams) {
    for (const cookieParam of cookieParams) {
      const cookieValue = requestContext?.headers?.cookie?.split('; ').find(cookie => cookie.startsWith(cookieParam.param))?.split('=')[1];

      if (!cookieValue) {
        throw new BadRequestError(`Missing cookie: ${cookieParam.param}`);
      }

      args[cookieParam.index] = castToType(cookieValue, cookieParam.type);
    }
  }

  const response = await instance[method](...args);

  if (response instanceof Response) {
    return response;
  }

  return Response.builder()
    .setBody(response)
    .setStatusCode(200)
    .build();
};

const castToType = (value: unknown, type: string) => {
  switch (type) {
    case 'Number':
      return Number(value);
    case 'String':
      return value;
    case 'Boolean':
      return value === 'true';
    default:
      return value;
  }
};

const prepareResponseBody = (body: unknown, contentType: string) => {
  switch (contentType.toLowerCase()) {
    case 'application/json':
      return JSON.stringify(body);
    case 'text/plain':
      return String(body);
    default:
      return body;
  }
}
