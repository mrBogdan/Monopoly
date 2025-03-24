import {UserRepository} from "./UserRepository";
import {User} from "./User";
import {UserEmailAlreadyExistsError} from "./UserEmailAlreadyExistsError";
import {UserRepeatedPasswordWrongError} from "./UserRepeatedPasswordWrongError";
import {UserPasswordHasher} from "./UserPasswordHasher";
import {UserIdGenerator} from "./UserIdGenerator";
import {UserRegistrationDataDto} from "./DTO/UserRegistrationDataDto";
import {PostgresUserRepository} from "./PostgresUserRepository";
import {getConfig} from "../nodejs/getConfig";
import {getConnectedPostgresClient} from "../getConnectedPostgresClient";

export class UserService {
    constructor(
        private userIdGenerator: UserIdGenerator,
        private userRepository: UserRepository,
        private userPasswordHasher: UserPasswordHasher,
    ) {
    }

    async register(userRegistrationDataDto: UserRegistrationDataDto): Promise<User>
    {
        const {name, email, password, repeatedPassword} = userRegistrationDataDto;
        if (await this.isEmailExists(email)) {
            throw new UserEmailAlreadyExistsError(email);
        }

        if (!this.isCorrectRepeatedPassword(
            password,
            repeatedPassword)
        ) {
            throw new UserRepeatedPasswordWrongError();
        }

        //TODO: sendEmailConfirmation();

        const hashedPassword = this.userPasswordHasher.hash(password);
        const userId = this.userIdGenerator.generateUUID();

        return await this.userRepository.create(
            new User(userId, name, hashedPassword, email)
        );
    }

    private isCorrectRepeatedPassword(password: string, repeatedPassword: string): boolean {
        return password.trim() === repeatedPassword.trim();
    }

    private async isEmailExists(email: string): Promise<boolean> {
        const user = await this.userRepository.findByEmail(email);
        return !!user;
    }
}

export const createUserService = async () => {
    // TODO: fix when DI implemented
    const client = await getConnectedPostgresClient(getConfig().postgresConfig);

    return new UserService(
        new UserIdGenerator(),
        new PostgresUserRepository(client),
        new UserPasswordHasher(),
    );
}
