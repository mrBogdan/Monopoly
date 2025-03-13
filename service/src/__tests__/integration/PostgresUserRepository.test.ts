import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { Client } from 'pg';

import { PostgresUserRepository } from '../../user/PostgresUserRepository';
import { User } from '../../user/User';

jest.setTimeout(5000);

describe('PostgresUserRepository', () => {
    let container: StartedPostgreSqlContainer;
    let client: Client;
    let repository: PostgresUserRepository;

    const regularUser = new User('1', 'John Doe', 'password', 'some@email.com');

    const truncateUsersTable = async () => {
        await client.query('TRUNCATE TABLE users');
    }

    beforeAll(async () => {
        container = await new PostgreSqlContainer().start();
        const config = {
            user: container.getUsername(),
            host: container.getHost(),
            database: container.getDatabase(),
            password: container.getPassword(),
            port: container.getMappedPort(5432),
        };
        client = new Client(config);
        repository = new PostgresUserRepository(client);

        await client.connect();

        client.on('error', console.error);

        console.log({
            config,
            container,
            client,
        })

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

    beforeEach(truncateUsersTable);

    describe('create', () => {
        it('should create a user', async () => {
            const user = await repository.create(regularUser);

            expect(user).toEqual(regularUser);
        });
    });
});
