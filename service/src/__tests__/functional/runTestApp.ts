import { Server } from 'node:http';

import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { Client } from 'pg';

import { Application } from '../../Application';
import { Constructor, Container } from '../../di';
import { runServer } from '../../runServer';
import { getTestConfig } from '../getTestConfig';

import { getTestConfigModule } from './getTestConfigModule';

export class TestApp extends Application {
  constructor(container: Container, modules: Constructor[], private postgresContainer: StartedPostgreSqlContainer) {
    super(container, [...modules, getTestConfigModule(getTestConfig({
      postgresConfig: {
        host: postgresContainer.getHost(),
        port: postgresContainer.getMappedPort(5432),
        user: postgresContainer.getUsername(),
        password: postgresContainer.getPassword(),
        database: postgresContainer.getDatabase(),
      },
      withMigration: true,
    }))]);
  }

  public static async of(modules: Constructor[]): Promise<TestApp> {
    const postgresContainer = new PostgreSqlContainer();
    const startedContainer = await postgresContainer.start();

    return new TestApp(
      new Container(),
      modules,
      startedContainer,
    );
  }

  async gracefulShutdown() {
    await super.gracefulShutdown(async (container: Container) => {
      const client: Client = container.resolve<Client>(Client);
      const server: Server = container.resolve<Server>(Server);
      await Promise.all([
        client.end(),
        server.close(),
      ]);
    });

    await this.postgresContainer.stop();
  }
}

export const runTestApp = async (modules: Constructor[]): Promise<TestApp> => {
  const app = await TestApp.of(modules);

  await app.run(runServer);

  return app;
};
