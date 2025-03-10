import { Pool } from 'pg';

import { UserRepository } from './UserRepository';
import { User } from './User';
import { UserNotFoundError } from './UserNotFoundError';

export class PostgresUserRepository implements UserRepository {
    constructor(private readonly db: Pool) {
    }

    async create(user: User): Promise<User> {
        const query = `
            INSERT INTO users (id, name, "passwordHash", email)
            VALUES ($1, $2, $3, $4) RETURNING *
        `;

        const result = await this.db.query(query, [user.id, user.name, user.passwordHash, user.email]);
        const createdUser = result.rows[0];
        console.log({ createdUser });

        return new User(createdUser.id, createdUser.name, createdUser.passwordHash, createdUser.email);
    }

    async getByEmail(email: string): Promise<User> {
        const query = 'SELECT * FROM users WHERE email = $1';

        const result = await this.db.query(query, [email]);

        const user = result.rows[0];

        if (!user) {
            throw new UserNotFoundError(email);
        }

        return new User(user.id, user.name, user.passwordHash, user.email);
    }
}
