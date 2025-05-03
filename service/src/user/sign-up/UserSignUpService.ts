import { UserSignUpDto } from './UserSignUpDto';
import { UserResponse } from '../UserResponse';
import { Inject } from '../../di/Inject';
import { Hasher } from '../../hasher/Hasher';
import { IdGenerator } from '../../idGenerator/IdGenerator';
import { User } from '../User';
import { UserEmailAlreadyExistsError } from '../UserEmailAlreadyExistsError';
import { UserRepeatedPasswordWrongError } from '../UserRepeatedPasswordWrongError';
import { USER_REPOSITORY, UserRepository } from '../UserRepository';

export class UserSignUpService {
  constructor(
    private userIdGenerator: IdGenerator,
    @Inject(USER_REPOSITORY) private userRepository: UserRepository,
    private userPasswordHasher: Hasher,
  ) {}

  async register(userRegistrationDataDto: UserSignUpDto): Promise<UserResponse> {
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

    const user = await this.userRepository.create(new User(userId, name, hashedPassword, email));
    return new UserResponse(user.id, user.name, user.email);
  }

  private isCorrectRepeatedPassword(password: string, repeatedPassword: string): boolean {
    return password.trim() === repeatedPassword.trim();
  }

  private async isEmailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    return !!user;
  }
}
