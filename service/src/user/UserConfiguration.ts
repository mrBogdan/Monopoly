import { Client } from 'pg';

import { UserRepository } from './UserRepository';
import { PostgresUserRepository } from './PostgresUserRepository';

export class UserConfiguration {
    constructor(private readonly dbConnection: Client) {
    }

    createRepository(): UserRepository  {
        return new PostgresUserRepository(this.dbConnection);
    }
}
