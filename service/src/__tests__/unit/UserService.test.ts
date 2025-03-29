import { UserService } from '../../user/UserService';
import { UserRepository } from '../../user/UserRepository';
import { User } from '../../user/User';
import { IdGenerator } from '../../idGenerator/IdGenerator';
import { Hasher } from '../../hasher/Hasher';
import { UserRegistrationDto } from '../../user/UserRegistrationDto';

describe('UserService', () => {
  let userRepository: jest.Mocked<UserRepository>;
  let userIdGenerator: jest.Mocked<IdGenerator>;
  let userPasswordHasher: jest.Mocked<Hasher>;
  let userService: UserService;

  const userRegistrationDto: UserRegistrationDto = {
    name: 'John Doe',
    email: 'test@gmail.com',
    password: 'password',
    repeatedPassword: 'password',
  };

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    userIdGenerator = {
      generateUUID: jest.fn().mockReturnValue('generated-id'),
    } as unknown as jest.Mocked<IdGenerator>;

    userPasswordHasher = {
      hash: jest.fn().mockReturnValue('hashed-password'),
    } as unknown as jest.Mocked<Hasher>;

    userService = new UserService(userIdGenerator, userRepository, userPasswordHasher);
  });

  it('should register a new user', async () => {
    userRepository.findByEmail.mockResolvedValue(undefined);

    await userService.register(userRegistrationDto);

    expect(userRepository.findByEmail).toHaveBeenCalledWith('test@gmail.com');

    expect(userRepository.create).toHaveBeenCalledWith(
      new User('generated-id', 'John Doe', 'hashed-password', 'test@gmail.com'),
    );

    expect(userPasswordHasher.hash).toHaveBeenCalledWith('password');
  });

  it('should throw an error if email already exists', async () => {
    userRepository.findByEmail.mockResolvedValue(
      new User('existing-id', 'John Doe', 'hashed-password', 'test@gmail.com'),
    );

    await expect(
      userService.register(userRegistrationDto),
    ).rejects.toThrow('User email test@gmail.com already exists');

    expect(userRepository.findByEmail).toHaveBeenCalledWith('test@gmail.com');
  });

  it('should throw an error if passwords do not match', async () => {
    userRepository.findByEmail.mockResolvedValue(undefined);

    await expect(
      userService.register({
        ...userRegistrationDto,
        repeatedPassword: 'wrong-password',
      }),
    ).rejects.toThrow('Incorrect password or repeated password');
  });
});
