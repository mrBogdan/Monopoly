import http from 'node:http';
import { parse } from 'node:url';

import { Headers } from './headers';
import { Router } from './router/Router';
import { isMethodWithBody, Methods } from './Methods';
import { Container } from '../di/Container';
import { getErrorMapper } from '../decorators/UseErrorMapper';
import { getParams } from './Param';
import { getQueryParams } from './QueryParam';
import { BadRequestError } from '../errors/BadRequestError';
import { toJsonError } from '../errors/toJsonError';
import { handleBusinessError } from '../errors/handleBusinessError';
import { handleProtocolError } from '../errors/handleProtocolError';
import { parseRequestBody } from './parseRequestBody';
import { getRequestBodyParams } from './RequestBody';

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
    res.writeHead(200, Headers.ContentType.json);
    res.end(JSON.stringify(response));
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

const executeHandler = (instance: ClassInstance, method: string, requestContext: RequestContext): Promise<object> => {
  const params = getParams(instance, method);
  const queryParams = getQueryParams(instance, method);
  const requestBodyParams = getRequestBodyParams(instance, method);

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

  return instance[method](...args);
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
