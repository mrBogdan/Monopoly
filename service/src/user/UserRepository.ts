import { User } from './User';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepository {
    create(user: User): Promise<User>;
    findByEmail(email: string): Promise<User|undefined>
    getRequiredUserByEmail(email: string): Promise<User|undefined>
}
