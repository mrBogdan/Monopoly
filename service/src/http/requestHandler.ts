import http from 'node:http';
import { parse } from 'node:url';

import { Headers } from './headers';
import { Router } from './router/Router';
import { Methods } from './Methods';
import { globalContainer } from '../di/Container';
import { getErrorMapper } from '../decorators/UseErrorMapper';
import { getParams } from '../decorators/Param';
import { getQueryParams } from '../decorators/QueryParam';
import { BadRequestError } from '../errors/BadRequestError';
import { toJsonError } from '../errors/toJsonError';
import { handleBusinessError } from '../errors/handleBusinessError';
import { handleProtocolError } from '../errors/handleProtocolError';
import { ResponseError } from '../errors/ResponseError';

type RequestContext = {
  params?: Map<string, string>;
  query?: Record<string, string>;
  body?: object;
};

export const requestHandler = (router: Router) => async (req: http.IncomingMessage, res: http.ServerResponse) => {
  let handler;
  try {
    const urlParsed = parse(req.url ?? '', true);
    const route = router.findRoute(urlParsed.path ?? '', req.method?.toUpperCase() as Methods);

    handler = route.handler();
    const instance = globalContainer.resolve(handler.controller());
    const response = await executeHandler(instance, handler.action(), {
      query: urlParsed?.query as Record<string, string>,
      params: route.getParams(),
    });
    res.writeHead(200, Headers.ContentTypes.json);
    res.end(JSON.stringify(response));
  } catch (error) {
    console.error(error);

    const protocolError = handleProtocolError(error);

    if (protocolError) {
      res.writeHead(protocolError.status, Headers.ContentTypes.json);
      res.end(toJsonError(protocolError));
      return;
    }

    if (!handler) {
      res.writeHead(500, Headers.ContentTypes.json);
      res.end(toJsonError({ message: 'Internal server error', status: 500 } as ResponseError));
      return;
    }

    const errorMapper = getErrorMapper(handler.controller());

    const responseError = handleBusinessError(error, errorMapper);

    res.writeHead(responseError.status, Headers.ContentTypes.json);
    res.end(toJsonError(responseError));
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const executeHandler = async (instance: any, method: string, requestContext: RequestContext) => {
  const params = getParams(instance, method);
  const queryParams = getQueryParams(instance, method);
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

  return await instance[method](...args);
};

const castToType = (value: string, type: string) => {
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
