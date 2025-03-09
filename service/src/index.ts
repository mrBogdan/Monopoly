import { WebSocketServer } from 'ws';
import { Action } from './action/Action';
import { actionFactory } from './actionFactory';
import { BadRequestError } from './BadRequestError';

const PORT = process.env.PORT || 8080;

const parseRequest = (requestMessage: string): Action => {
  try {
    return JSON.parse(requestMessage);
  } catch (e) {
    throw new BadRequestError();
  }
}

const handleRequest = (msg: string): object => {
  const request: Action = parseRequest(msg);

  if (!('type' in request)) {
    console.warn('Bad request:', msg);
    throw new BadRequestError();
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
          console.warn('Bad request:', request);
          ws.send(JSON.stringify({ status: 400, message: 'Bad Request'}));
          return;
        }

        ws.send(JSON.stringify({status: 500, message: 'Internal Server Error'}));
      }
    });
  });
};

run();

process.on('uncaughtException', console.error);
