import { Server } from 'node:http';
import { Client } from 'pg';

import { AppModule } from './AppModule';
import { Application } from './Application';
import { isDevelopment, isProduction } from './nodejs/getEnv';
import { runServer } from './runServer';
import { Container } from './di/Container';

const main = async () => {
  if (isProduction() || isDevelopment()) {
    const app = new Application(
      new Container(),
      AppModule,
    );

    process.on('uncaughtException', console.error);

    await app.run(runServer);

    process.on('SIGTERM', async () => {
     await app.gracefulShutdown(async (container: Container) => {
        const server = container.resolve<Server>(Server);
        const client = container.resolve<Client>(Client);

        await Promise.all([
          server.close(),
          client.end(),
        ])
      });
    });
  }
};

main();
