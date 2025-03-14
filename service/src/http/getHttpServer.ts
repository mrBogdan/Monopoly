import http, { Server } from 'node:http';

import {getWebSocketServer} from '../wss/getWebSocketServer';
import { requestHandler } from './requestHandler';

const server = http.createServer(requestHandler);

const wss = getWebSocketServer();

server.on('upgrade', (request, socket, head) => {
    if (request.url === '/ws') {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

export const getHttpServer = (): Server => {
    return server;
};

