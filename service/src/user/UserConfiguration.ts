import { Pool } from 'pg';

import { UserRepository } from './UserRepository';
import { PostgresUserRepository } from './PostgresUserRepository';

export class UserConfiguration {
    constructor(private readonly dbConnection: Pool) {
    }

    createRepository(): UserRepository  {
        return new PostgresUserRepository(this.dbConnection);
    }
}
