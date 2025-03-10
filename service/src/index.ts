import { WebSocketServer } from 'ws';
import { Action } from './action/Action';
import { actionFactory } from './actionFactory';
import { errorMapper } from './errorMapper';
import { InternalServerError } from './errors/InternalServerError';
import { BadRequestError } from './errors/BadRequestError';

const PORT = process.env.PORT || 8080;

const parseRequest = (requestMessage: string): Action => {
  try {
    return JSON.parse(requestMessage);
  } catch (e) {
    throw new BadRequestError('Incorrect JSON format');
  }
}

const handleRequest = (msg: string): object => {
  const request: Action = parseRequest(msg);

  if (!('type' in request)) {
    console.warn('Bad request:', msg);
    throw new BadRequestError('Request type is absent or not supported');
  }

  const handler = actionFactory(request.type);

  return handler(request);
}

const run = async () => {
  const wss = new WebSocketServer({
    port: +PORT,
  });

  wss.on('listening', () => {
    console.log(`[WS] Server is running on: ${PORT}`);
  });

  wss.on('connection', (ws) => {
    ws.on('error', console.error);

    ws.on('message', (msg) => {
      const request = msg.toString();
      try {
        const response = handleRequest(request);
        ws.send(JSON.stringify(response));
      } catch (error) {
        if (error instanceof BadRequestError) {
          ws.send(JSON.stringify({
            message: error.message,
            status: error.status,
            reason: error.reason,
          }));
          return;
        }

        for (const [BusinessError, ResponseError] of errorMapper) {
          if (error instanceof BusinessError) {
            const responseError = new ResponseError(error.message);
            ws.send(JSON.stringify({
              message: responseError.message,
              status: responseError.status,
              reason: responseError.reason,
            }));
            return;
          }
        }

        const internalServerError = new InternalServerError();
        ws.send(internalServerError.message);
      }
    });
  });
};

run();

process.on('uncaughtException', console.error);
