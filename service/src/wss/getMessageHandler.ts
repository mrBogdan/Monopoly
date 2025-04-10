import { WebSocket } from 'ws';

import { Action } from '../action/Action';
import {
  BadRequestError,
  handleBusinessError,
  toJsonError,
  handleProtocolError,
} from '../errors';
import { Container } from '../di';
import { WsRouter } from './WsRouter';
import { ClassInstance } from '../http';

const parseRequest = (requestMessage: string): Action => {
  try {
    return JSON.parse(requestMessage);
  } catch {
    throw new BadRequestError('Incorrect JSON format');
  }
};

const handleType = (action: Action) => {
  if (!('type' in action)) {
    console.warn('Bad request:', action);
    throw new BadRequestError('Request type is absent or not supported');
  }


  if (action.type === 'ping') {
    return {type: 'ping', message: 'pong'};
  }
}

const handleRequest = async (msg: string): Promise<object> => {
  const request: Action = parseRequest(msg);

  if (!('type' in request)) {
    console.warn('Bad request:', msg);
    throw new BadRequestError('Request type is absent or not supported');
  }

  if (request.type === 'ping') {
    return {type: 'ping', message: 'pong'};
  }

  const handler = async (request: Action) => ({request});
  const response = await handler(request);

  return {data: response, type: request.type};
};

export const getMessageHandler = (ws: WebSocket, container: Container) => async (msg: string) => {
  try {
    const router = container.resolve<WsRouter>(WsRouter);
    const action = parseRequest(msg);

    const hubHandler = router.findHub(action.type);
    const hub = container.resolve<ClassInstance>(hubHandler.hub);

    const response = await hub[hubHandler.method](action);

    ws.send(JSON.stringify(response));
  } catch (error: unknown) {
    const protocolError = handleProtocolError(error);

    if (protocolError) {
      ws.send(toJsonError(protocolError));
      return;
    }

    ws.send(toJsonError(handleBusinessError(error, new Map())));
  }
};
