import { WebSocketServer, WebSocket } from 'ws';

import { Action } from './action/Action';
import { BadRequestError } from './errors/BadRequestError';
import { actionFactory } from './actionFactory';
import { errorMapper } from './errorMapper';
import { InternalServerError } from './errors/InternalServerError';
import { ResponseError } from './errors/ResponseError';
import { errors } from './errors/errors';

let wss: WebSocketServer | null = null;

const parseRequest = (requestMessage: string): Action => {
    try {
        return JSON.parse(requestMessage);
    } catch {
        throw new BadRequestError('Incorrect JSON format');
    }
}

const handleRequest = async (msg: string): Promise<object> => {
    const request: Action = parseRequest(msg);

    if (!('type' in request)) {
        console.warn('Bad request:', msg);
        throw new BadRequestError('Request type is absent or not supported');
    }

    if (request.type === 'ping') {
        return { type: 'ping', message: 'pong' };
    }

    const handler = actionFactory(request.type);

    return handler(request);
}

const prepareResponseError = (error: ResponseError) => {
    return JSON.stringify({
        message: error.message,
        status: error.status,
        reason: error.reason,
    });
}

const onMessage = (ws: WebSocket) => async (msg: string) => {
    const request = msg.toString();

    try {
        const response = await handleRequest(request);
        ws.send(JSON.stringify(response));
    } catch (error) {
        for (const ResponseError of errors) {
            if (error instanceof ResponseError) {
                ws.send(prepareResponseError(error));
                return;
            }
        }

        for (const [BusinessError, ResponseError] of errorMapper) {
            if (error instanceof BusinessError) {
                const responseError = new ResponseError(error.message);
                ws.send(prepareResponseError(responseError));
                return;
            }
        }

        const internalServerError = new InternalServerError();
        ws.send(prepareResponseError(internalServerError));
    }
};

export const getWebSocketServer = (): WebSocketServer  => {
    if (wss) {
        return wss;
    }

    wss = new WebSocketServer({
        noServer: true,
    });
    wss.on('error', console.error);

    wss.on('connection', (ws) => {
        ws.on('error', console.error);

        ws.on('message', onMessage(ws));
    });

    wss.on('close', () => {
        console.log('Client disconnected');
    });

    return wss;
};
