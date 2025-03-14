import { ServiceConfiguration } from './ServiceConfiguration';
import { getHttpServer } from './http/getHttpServer';
import { getWebSocketServer } from './wss/getWebSocketServer';
import { gracefulShutdown } from './gracefulShutdown';

const main = async () => {
    const config: ServiceConfiguration = {
        httpPort: 8080,
    };

    const httpServer = getHttpServer();
    const wss = getWebSocketServer();

    httpServer.listen(config.httpPort, () => {
        console.log(`Http and WebSocket Servers are running on: ${config.httpPort}`);
    });

    gracefulShutdown(httpServer, wss);
};

main();

process.on('uncaughtException', console.error);
