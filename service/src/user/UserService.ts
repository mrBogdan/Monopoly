import { UserRepository } from './UserRepository';
import { User } from './User';
import { UserEmailAlreadyExistsError } from './UserEmailAlreadyExistsError';
import { UserRepeatedPasswordWrongError } from './UserRepeatedPasswordWrongError';
import { Hasher } from '../hasher/Hasher';
import { IdGenerator } from '../idGenerator/IdGenerator';
import { UserRegistrationDto } from './UserRegistrationDto';
import { PostgresUserRepository } from './PostgresUserRepository';
import { Client } from 'pg';

export class UserService {
  constructor(
    private userIdGenerator: IdGenerator,
    private userRepository: UserRepository,
    private userPasswordHasher: Hasher,
  ) {
  }

  async register(userRegistrationDataDto: UserRegistrationDto): Promise<User> {
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

    return this.userRepository.create(new User(userId, name, hashedPassword, email));
  }

  private isCorrectRepeatedPassword(password: string, repeatedPassword: string): boolean {
    return password.trim() === repeatedPassword.trim();
  }

  private async isEmailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    return !!user;
  }
}

export const createUserService = (client: Client) => {
  return new UserService(
    new IdGenerator(),
    new PostgresUserRepository(client),
    new Hasher(),
  );
};
