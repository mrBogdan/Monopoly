import { getHttpServer } from './http/getHttpServer';
import { getWebSocketServer } from './wss/getWebSocketServer';
import { gracefulShutdown } from './gracefulShutdown';
import { getConfig } from './nodejs/getConfig';
import { migrate } from './migrations/migration';
import { getConnectedPostgresClient } from './getConnectedPostgresClient';
import { Router } from './http/router/Router';

const main = async () => {
    const config = getConfig();
    const client = await getConnectedPostgresClient(config.postgresConfig);

    if (config.withMigration) {
        await migrate(client);
    }

    const router = new Router();

    const httpServer = getHttpServer();
    const wss = getWebSocketServer();

    httpServer.listen(config.httpPort, () => {
        console.log(`Http and WebSocket Servers are running on: ${config.httpPort}`);
    });

    gracefulShutdown(httpServer, wss);
};

main();

process.on('uncaughtException', console.error);
