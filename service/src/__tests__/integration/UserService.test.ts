import { UserSignUpService } from '../../user/sign-up/UserSignUpService';
import { PostgresUserRepository } from '../../user/PostgresUserRepository';
import { IdGenerator } from '../../idGenerator/IdGenerator';
import { Hasher } from '../../hasher/Hasher';
import { UserSignUpDto } from '../../user/sign-up/UserSignUpDto';
import { UserEmailAlreadyExistsError } from '../../user/UserEmailAlreadyExistsError';
import { UserRepeatedPasswordWrongError } from '../../user/UserRepeatedPasswordWrongError';
import { TestDatabase } from './TestDatabase';
import { UserResponse } from '../../user/UserResponse';

jest.setTimeout(15000);

describe('UserService Integration Tests (Real Database)', () => {
  let userService: UserSignUpService;
  let userRepository: PostgresUserRepository;
  let testEmail: string;
  let testDb: TestDatabase;

  beforeAll(async () => {
    testDb = await TestDatabase.create();

    userRepository = new PostgresUserRepository(testDb.getClient());
    userService = new UserSignUpService(
      new IdGenerator(),
      userRepository,
      new Hasher(),
    );

    testEmail = `test-${Date.now()}@example.com`;
  });

  afterAll(async () => {
    await testDb.cleanup();
  });

  const truncateUsersTable = async () => {
    await testDb.getClient().query('TRUNCATE TABLE users');
  };
  beforeEach(truncateUsersTable);

  it('should register a new user in the database', async () => {
    const userData: UserSignUpDto = {
      name: 'Integration Test User',
      email: testEmail,
      password: 'securePassword123!',
      repeatedPassword: 'securePassword123!',
    };

    const user = await userService.register(userData);

    expect(user).toBeInstanceOf(UserResponse);
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
    expect(user.id).toEqual(expect.any(String));

    const dbUser = await userRepository.findByEmail(testEmail);
    expect(dbUser).toBeDefined();
    expect(dbUser?.id).toBe(user.id);
    expect(dbUser?.name).toBe(userData.name);
  });

  it('should throw UserEmailAlreadyExistsError when email exists', async () => {
    await userService.register({
      name: 'Duplicate User',
      email: testEmail,
      password: 'password456',
      repeatedPassword: 'password456',
    });
    await expect(
      userService.register({
        name: 'Duplicate User',
        email: testEmail,
        password: 'password456',
        repeatedPassword: 'password456',
      }),
    ).rejects.toThrow(UserEmailAlreadyExistsError);
  });

  it('should throw UserRepeatedPasswordWrongError when passwords dont match', async () => {
    const uniqueEmail = `test-${Date.now()}@example.com`;

    await expect(
      userService.register({
        name: 'Test User',
        email: uniqueEmail,
        password: 'password123',
        repeatedPassword: 'differentPassword',
      }),
    ).rejects.toThrow(UserRepeatedPasswordWrongError);

    const dbUser = await userRepository.findByEmail(uniqueEmail);
    expect(dbUser).toBeUndefined();
  });

  it('should properly hash passwords before storage', async () => {
    const uniqueEmail = `test-${Date.now()}@example.com`;
    const plainPassword = 'myPlainPassword123';

    const userDto = {
      name: 'Password Test User',
      email: uniqueEmail,
      password: plainPassword,
      repeatedPassword: plainPassword,
    };

    const user = await userService.register(userDto);

    expect(user.email).not.toBe(plainPassword);
    expect(user.name).toBe(userDto.name);

    const dbUser = await userRepository.findByEmail(uniqueEmail);
    expect(dbUser?.passwordHash).toEqual(expect.any(String));
  });
});
