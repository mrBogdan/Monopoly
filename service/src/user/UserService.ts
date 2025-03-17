import {UserRepository} from "./UserRepository";
import {User} from "./User";
import {UserEmailAlreadyExistsError} from "./UserEmailAlreadyExistsError";
import {UserRepeatedPasswordWrongError} from "./UserRepeatedPasswordWrongError";
import {UserPasswordHasher} from "./UserPasswordHasher";
import {UserIdGenerator} from "./UserIdGenerator";

export class UserService {
    constructor(
        private userIdGenerator: UserIdGenerator,
        private userRepository: UserRepository,
        private userPasswordHasher: UserPasswordHasher,
    ) {
    }

    async register(name: string, email: string, password: string, repeatedPassword: string): Promise<User>
    {
        if (await this.isEmailExists(email)) {
            throw new UserEmailAlreadyExistsError(email);
        }

        if (!this.isCorrectRepeatedPassword(password, repeatedPassword)) {
            throw new UserRepeatedPasswordWrongError();
        }

        //TODO: sendEmailConfirmation();

        const hashedPassword = this.userPasswordHasher.hash(password);
        const userId = this.userIdGenerator.generateUUID();

        return await this.userRepository.create(new User(userId, name, hashedPassword, email));
    }

    private isCorrectRepeatedPassword(password: string, repeatedPassword: string): boolean {
        return password.trim() === repeatedPassword.trim();
    }

    private async isEmailExists(email: string): Promise<boolean> {
        const user = await this.userRepository.getByEmail(email);
        return !!user;
    }
}
