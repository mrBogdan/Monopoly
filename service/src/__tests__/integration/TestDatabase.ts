import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { Client } from 'pg';

import { getConnectedPostgresClient } from '../../getConnectedPostgresClient';
import { migrate } from '../../migrations/migration';

export class TestDatabase {
  private container!: StartedPostgreSqlContainer;
  private client!: Client;

  async setup() {
    this.container = await new PostgreSqlContainer().start();
    this.client = await getConnectedPostgresClient({
      user: this.container.getUsername(),
      host: this.container.getHost(),
      database: this.container.getDatabase(),
      password: this.container.getPassword(),
      port: this.container.getMappedPort(5432),
    });
    await migrate(this.client);
    return this.client;
  }

  async cleanup() {
    if (this.client) {
      await this.client.end();
    }
    if (this.container) {
      await this.container.stop();
    }
  }

  getClient() {
    return this.client;
  }
}
