import { Client } from 'pg';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';

import { getConnectedPostgresClient } from '../../../database/getConnectedPostgresClient';
import { migrate, rollback } from '../../../migrations/migration';

describe('migrate test', () => {
  let container: StartedPostgreSqlContainer;
  let client: Client;

  beforeAll(async () => {
    const postgresContainer = new PostgreSqlContainer();
    container = await postgresContainer.start();

    client = await getConnectedPostgresClient({
      user: container.getUsername(),
      host: container.getHost(),
      database: container.getDatabase(),
      password: container.getPassword(),
      port: container.getMappedPort(5432),
    });
  });

  afterAll(async () => {
    await client.end();
    await container.stop();
  });

  it('migration test', async () => {
    expect(await migrate(client)).toBeUndefined();
  });

  it('rollback test', async () => {
    expect(await rollback(client)).toBeUndefined();
  })
})
