import { Client } from 'pg';

import { UserRepository } from './UserRepository';
import { User } from './User';
import { UserNotFoundError } from './UserNotFoundError';
import { Inject } from '../di/Inject';

export const POSTGRES_USER_REPOSITORY = Symbol('POSTGRES_USER_REPOSITORY');

export class PostgresUserRepository implements UserRepository {
    constructor(@Inject('db') private readonly db: Client) {
    }

    async create(user: User): Promise<User> {
        const query: string = `
            INSERT INTO users (id, name, "passwordHash", email)
            VALUES ($1, $2, $3, $4) RETURNING *
        `;

        const result = await this.db.query(query, [user.id, user.name, user.passwordHash, user.email]);
        const createdUser = result.rows[0];

        return new User(createdUser.id, createdUser.name, createdUser.passwordHash, createdUser.email);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const query: string = 'SELECT * FROM users WHERE email = $1';

        const result = await this.db.query(query, [email]);

        const user = result.rows[0];

        if (!user) {
            return undefined;
        }

        return new User(user.id, user.name, user.passwordHash, user.email);
    }

    async getRequiredUserByEmail(email: string): Promise<User> {
        const user = await this.findByEmail(email);

        if (!user) {
            throw new UserNotFoundError(email);
        }

        return user;
    }
}
