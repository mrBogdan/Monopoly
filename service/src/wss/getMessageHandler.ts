import { WebSocket } from 'ws';

import { Action } from '../action/Action';
import { actionFactory } from '../action/actionFactory';
import { BadRequestError } from '../errors/BadRequestError';
import { handleBusinessError } from '../errors/handleBusinessError';
import { handleProtocolError } from '../errors/handleProtocolError';
import { toJsonError } from '../errors/toJsonError';

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
    const response = await handler(request);

    return { data: response, type: request.type };
}

export const getMessageHandler = (ws: WebSocket) => async (msg: string) => {
    try {
        const response = await handleRequest(msg.toString());
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
