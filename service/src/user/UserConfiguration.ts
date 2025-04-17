import { Client } from 'pg';

import { PostgresUserRepository } from './PostgresUserRepository';
import { UserRepository } from './UserRepository';

export class UserConfiguration {
    constructor(private readonly dbConnection: Client) {
    }

    createRepository(): UserRepository  {
        return new PostgresUserRepository(this.dbConnection);
    }
}
