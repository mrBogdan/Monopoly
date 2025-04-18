import { Server } from 'node:http';

import { Client } from 'pg';

import { Application } from './Application';
import { AppModule } from './AppModule';
import { Container } from './di/Container';
import { isDevelopment, isProduction } from './nodejs/getEnv';
import { runServer } from './runServer';

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
