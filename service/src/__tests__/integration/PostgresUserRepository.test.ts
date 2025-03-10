import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { Pool } from 'pg';

import { PostgresUserRepository } from '../../user/PostgresUserRepository';
import { User } from '../../user/User';

jest.setTimeout(5000);

describe('PostgresUserRepository', () => {
    let container: StartedPostgreSqlContainer;
    let client: Pool;
    let repository: PostgresUserRepository;

    const regularUser = new User('1', 'John Doe', 'password', 'some@email.com');

    beforeAll(async () => {
        container = await new PostgreSqlContainer().start();
        const config = {
            user: container.getUsername(),
            host: container.getHost(),
            database: container.getDatabase(),
            password: container.getPassword(),
            port: container.getMappedPort(5432),
        };
        client = new Pool(config);
        repository = new PostgresUserRepository(client);

        await client.connect();

        await client.query(`
            CREATE TABLE users
            (
                id             TEXT PRIMARY KEY,
                name           TEXT NOT NULL,
                "passwordHash" TEXT NOT NULL,
                email          TEXT NOT NULL
            )
        `);
    });

    afterAll(async () => {
        await client.end();
        await container.stop();
    });

    describe('create', () => {
        it('should create a user', async () => {
            const user = await repository.create(regularUser);

            expect(user).toEqual(regularUser);
        });
    });
});
