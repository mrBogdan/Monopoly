import {UserService} from "../../user/UserService";
import {UserRepository} from "../../user/UserRepository";
import {User} from "../../user/User";
import {UserIdGenerator} from "../../user/UserIdGenerator";
import {UserPasswordHasher} from "../../user/UserPasswordHasher";

describe('UserService', () => {
  let userRepository: jest.Mocked<UserRepository>;
  let userIdGenerator: jest.Mocked<UserIdGenerator>;
  let userPasswordHasher: jest.Mocked<UserPasswordHasher>;
  let userService: UserService;

  beforeEach(() => {
    userRepository = {
      getByEmail: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    userIdGenerator = {
      generateUUID: jest.fn().mockReturnValue('generated-id'),
    } as unknown as jest.Mocked<UserIdGenerator>;

    userPasswordHasher = {
      hash: jest.fn().mockReturnValue('hashed-password'),
    } as unknown as jest.Mocked<UserPasswordHasher>;

    userService = new UserService(userIdGenerator, userRepository, userPasswordHasher);
  });

  it('should register a new user', async () => {
    userRepository.getByEmail.mockResolvedValue(null);

    await userService.register('John Doe', 'test@gmail.com', 'password', 'password');

    expect(userRepository.getByEmail).toHaveBeenCalledWith('test@gmail.com');

    expect(userRepository.create).toHaveBeenCalledWith(
        new User('generated-id', 'John Doe', 'hashed-password', 'test@gmail.com')
    );

    expect(userPasswordHasher.hash).toHaveBeenCalledWith('password');
  });

  it('should throw an error if email already exists', async () => {
    userRepository.getByEmail.mockResolvedValue(
        new User('existing-id', 'John Doe', 'hashed-password', 'test@gmail.com')
    );

    await expect(
        userService.register('John Doe', 'test@gmail.com', 'password', 'password')
    ).rejects.toThrow('User email test@gmail.com already exists');

    expect(userRepository.getByEmail).toHaveBeenCalledWith('test@gmail.com');
  });

  it('should throw an error if passwords do not match', async () => {
    userRepository.getByEmail.mockResolvedValue(null);

    await expect(
        userService.register('John Doe', 'test@gmail.com', 'password', 'wrong-password')
    ).rejects.toThrow('Incorrect password or repeated password');
  });
});
