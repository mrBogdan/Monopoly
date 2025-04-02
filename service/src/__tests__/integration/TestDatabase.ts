import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { Client } from 'pg';

import { getConnectedPostgresClient } from '../../database/getConnectedPostgresClient';
import { migrate } from '../../migrations/migration';

export class TestDatabase {
  private readonly container: StartedPostgreSqlContainer;
  private readonly client: Client;

  constructor(container: StartedPostgreSqlContainer, client: Client) {
    this.container = container;
    this.client = client;
  }

  static async create() {
    const container = await new PostgreSqlContainer().start();
    const client = await getConnectedPostgresClient({
      user: container.getUsername(),
      host: container.getHost(),
      database: container.getDatabase(),
      password: container.getPassword(),
      port: container.getMappedPort(5432),
    });
    await migrate(client);

    return new TestDatabase(container, client);
  }

  async cleanup() {
    await Promise.all([
      this.client.end(),
      this.container.stop()
    ]);
  }

  getClient() {
    return this.client;
  }
}
