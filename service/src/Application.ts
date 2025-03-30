import { Server } from 'node:http';
import { Client } from 'pg';

import { Constructor, Container } from './di/Container';
import { Router } from './http/router/Router';
import { ServiceConfiguration } from './ServiceConfiguration';
import { getConnectedPostgresClient } from './getConnectedPostgresClient';
import { migrate } from './migrations/migration';

export class Application {
  private server: Server | null = null;
  private client: Client | null = null;

  constructor(
    private readonly diContainer: Container,
    private readonly router: Router,
    private readonly modules: Constructor<unknown>[],
    private readonly config: ServiceConfiguration,
  ) {
  }

  async init(getHttpServer: (router: Router, container: Container) => Server) {
    await this.diContainer.init(this.modules);
    this.client = await getConnectedPostgresClient(this.config.postgresConfig);

    if (this.config.withMigration) {
      await migrate(this.client);
    }

    this.server = getHttpServer(this.router, this.diContainer);
    return this.server;
  }

  async gracefulShutdown() {
    if (this.server) {
      this.server.close();
    }
    if (this.client) {
      await this.client.end();
    }
  }
}
