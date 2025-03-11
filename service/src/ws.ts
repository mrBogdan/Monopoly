import { WebSocketServer } from 'ws';

import { Action } from './action/Action';
import { BadRequestError } from './errors/BadRequestError';
import { actionFactory } from './actionFactory';
import { errorMapper } from './errorMapper';
import { InternalServerError } from './errors/InternalServerError';
import { ServiceConfiguration } from './ServiceConfiguration';
import { ResponseError } from './errors/ResponseError';

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

const onMessage = async (msg: string, ws: WebSocket) => {
    const request = msg.toString();
    try {
        const response = await handleRequest(request);
        ws.send(JSON.stringify(response));
    } catch (error) {
        if (error instanceof BadRequestError) {
            ws.send(prepareResponseError(error));
            return;
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

export const runWebSocketServer = (config: ServiceConfiguration): Promise<WebSocketServer>  => {
    return new Promise((resolve, reject) => {
        const wss = new WebSocketServer({
            port: config.wsPort,
        });

        wss.on('listening', () => {
            console.log(`[WS] Server is running on: ${config.wsPort}`);
            resolve(wss);
        });

        wss.on('error', reject);

        wss.on('connection', (ws) => {
            ws.on('error', console.error);

            ws.on('message', onMessage);
        });
    });


};
