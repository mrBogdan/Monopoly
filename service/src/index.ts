import { Server } from 'http';
import { WebSocketServer } from 'ws';

import { ServiceConfiguration } from './ServiceConfiguration';
import { getHttpServer } from './http';
import { runWebSocketServer } from './ws';

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
        wsPort: 8081,
    };

    const httpServer = getHttpServer();
    httpServer.listen(config.httpPort, () => {
        console.log(`[HTTP] Server is running on: ${config.httpPort}`);
    });
    const wss = await runWebSocketServer(config);

    gracefulShutdown(httpServer, wss);
};

main();

process.on('uncaughtException', console.error);
