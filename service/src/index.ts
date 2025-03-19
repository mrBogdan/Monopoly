import { getHttpServer } from './http/getHttpServer';
import { getWebSocketServer } from './wss/getWebSocketServer';
import { gracefulShutdown } from './gracefulShutdown';
import { getConfig } from './getConfig';

const main = async () => {
    const config = getConfig();

    const httpServer = getHttpServer();
    const wss = getWebSocketServer();

    httpServer.listen(config.httpPort, () => {
        console.log(`Http and WebSocket Servers are running on: ${config.httpPort}`);
    });

    gracefulShutdown(httpServer, wss);
};

main();

process.on('uncaughtException', console.error);
