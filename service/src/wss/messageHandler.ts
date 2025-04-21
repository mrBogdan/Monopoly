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

import { Broadcast } from './Broadcast';
import { getActionParams } from './EventParam';
import { Reply } from './Reply';
import { RoomService } from './room';
import { MemoryUserSocketRepository } from './user-socket';
import { Void } from './Void';
import { WsRouter } from './WsRouter';

type WsResponse = Broadcast<unknown> | Reply<unknown> | Void | object;

export const messageHandler = (ws: WebSocket, container: Container) => async (msg: string) => {
  try {
    const router = container.resolve<WsRouter>(WsRouter);
    const action = parseRequest(msg);

    const hubHandler = router.findHub(action.type);
    const instance = container.resolve<ClassInstance>(hubHandler.hub);
    const roomService = container.resolve<RoomService>(RoomService);
    const userSocketRepository = container.resolve<MemoryUserSocketRepository>(MemoryUserSocketRepository);

    const response = await executeHandler(instance, hubHandler.method, action);

    if (response instanceof Broadcast) {
      const {roomId} = response;
      const room = await roomService.getRoom(roomId);
      const userSockets = userSocketRepository.getUserSockets(room.getUserIds());

      for (const userSocket of userSockets) {
        if (userSocket.userId !== action.userId) {
          userSocket.socket.send(prepareResponse(response));
        }
      }
    }

    if (response instanceof Reply) {
      const {replyTo} = response;
      const userSocket = userSocketRepository.getUserSocket(replyTo);

      if (userSocket) {
        userSocket.send(prepareResponse(response));
      }
    }

    if (response && typeof response === 'object') {
      ws.send(prepareResponse(response));
    }

    return;
  } catch (error) {
    const protocolError = handleProtocolError(error);

    if (protocolError) {
      ws.send(toJsonError(protocolError));
      return;
    }

    ws.send(toJsonError(handleBusinessError(error, new Map())));
  }
};

const executeHandler = async (instance: ClassInstance, method: string, action: Action): Promise<WsResponse> => {
  const args: unknown[] = [];

  const params = getActionParams(instance, method);

  if (params) {
    for (const {index, param, type} of params) {

      if (param === 'userId') {
        args[index] = action.userId;
        continue;
      }

      const value = action.data[param];
      args[index] = castToType(value, type);
    }
  }

  return instance[method](...args);
};

const parseRequest = (requestMessage: string): Action => {
  try {
    return JSON.parse(requestMessage);
  } catch {
    throw new BadRequestError(`Incorrect JSON format ${requestMessage}`);
  }
};

const prepareResponse = (response: unknown): string => {
  if (response instanceof Broadcast) {
    return JSON.stringify({type: response.type, payload: response.payload});
  }

  if (response instanceof Reply) {
    return JSON.stringify({type: response.type, payload: response.payload});
  }

  if (response instanceof Void) {
    return '';
  }

  return JSON.stringify(response);
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
