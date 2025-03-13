import http, { Server } from 'http';

import {getWebSocketServer} from './ws';

const Headers = {
    ContentTypes: {
        json: 'application/json',
        plain: 'text/plain',
    },
}

const server = http.createServer((req, res) => {
    if (req.method?.toLowerCase() === 'get' && req.url === '/health') {
        res.writeHead(200, {'Content-Type': Headers.ContentTypes.json});
        res.end(JSON.stringify({ message: 'OK' }));
        return;
    }

    if (req.url === 'public/sign-up') {
        res.writeHead(200, {'Content-Type': Headers.ContentTypes.json});
        res.end(JSON.stringify({ message: 'Sign up' }));
        return;
    }

    res.writeHead(404, {'Content-Type': Headers.ContentTypes.json});
    res.end(JSON.stringify({ message: 'Not found' }));
});

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

