import { User } from './User';

export interface UserRepository {
    create(user: User): Promise<User>;
    findByEmail(email: string): Promise<User|undefined>
    getRequiredUserByEmail(email: string): Promise<User|undefined>
}
