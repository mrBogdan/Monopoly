import { Server } from 'http';
import { WebSocketServer } from 'ws';

import { ServiceConfiguration } from './ServiceConfiguration';
import { getHttpServer } from './http';
import { getWebSocketServer } from './ws';

const gracefulShutdown = (httpServer: Server, wss: WebSocketServer) => {
    process.on('SIGTERM', () => {
        console.log('SIGTERM signal received: closing HTTP server');
        httpServer.close(() => {
            console.log('HTTP server closed: closing WebSocket server');
            wss.close(() => {
                console.log('WebSocket server closed: exiting');
                process.exit(0);
            });
        });
    });
};

const main = async () => {
    const config: ServiceConfiguration = {
        httpPort: 8080,
    };

    const httpServer = getHttpServer();
    const wss = getWebSocketServer();

    httpServer.on('upgrade', (request, socket, head) => {
        if (request.url === '/ws') {
            wss.handleUpgrade(request, socket, head, (ws) => {
                wss.emit('connection', ws, request);
            });
        } else {
            socket.destroy();
        }
    });

    httpServer.listen(config.httpPort, () => {
        console.log(`Http and WebSocket Servers are running on: ${config.httpPort}`);
    });


    gracefulShutdown(httpServer, wss);
};

main();

process.on('uncaughtException', console.error);
