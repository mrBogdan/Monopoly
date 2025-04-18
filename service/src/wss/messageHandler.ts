import { WebSocket } from 'ws';

import { Action } from '../action/Action';
import { Container } from '../di';
import {
  BadRequestError,
  handleBusinessError,
  toJsonError,
  handleProtocolError,
} from '../errors';
import { ClassInstance } from '../http';

import { getActionParams } from './EventParam';
import { WsRouter } from './WsRouter';

export const messageHandler = (ws: WebSocket, container: Container) => async (msg: string) => {
  try {
    const router = container.resolve<WsRouter>(WsRouter);
    const action = parseRequest(msg);

    const hubHandler = router.findHub(action.type);
    const instance = container.resolve<ClassInstance>(hubHandler.hub);

    const response = await executeHandler(instance, hubHandler.method, action);

    ws.send(JSON.stringify(response));
  } catch (error) {
    const protocolError = handleProtocolError(error);

    if (protocolError) {
      ws.send(toJsonError(protocolError));
      return;
    }

    ws.send(toJsonError(handleBusinessError(error, new Map())));
  }
};

const executeHandler = async (instance: ClassInstance, method: string, action: Action) => {
  const args: unknown[] = [];

  const params = getActionParams(instance, method);

  if (params) {
    for (const { index, param, type } of params) {

      if (param === 'userId') {
        args[index] = action.userId;
        continue;
      }

      const value = action.data[param];
      args[index] = castToType(value, type);
    }
  }

  return instance[method](...args);
}

const parseRequest = (requestMessage: string): Action => {
  try {
    return JSON.parse(requestMessage);
  } catch {
    throw new BadRequestError(`Incorrect JSON format ${requestMessage}`);
  }
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



// const handleRequest = async (msg: string): Promise<object> => {
//   const request: Action = parseRequest(msg);
//
//   if (!('type' in request)) {
//     console.warn('Bad request:', msg);
//     throw new BadRequestError('Request type is absent or not supported');
//   }
//
//   if (request.type === 'ping') {
//     return {type: 'ping', message: 'pong'};
//   }
//
//   const handler = async (request: Action) => ({request});
//   const response = await handler(request);
//
//   return {data: response, type: request.type};
// };
