import { UserService } from '../../user/UserService';
import { PostgresUserRepository } from '../../user/PostgresUserRepository';
import { IdGenerator } from '../../idGenerator/IdGenerator';
import { Hasher } from '../../hasher/Hasher';
import { UserRegistrationDto } from '../../user/UserRegistrationDto';
import { UserEmailAlreadyExistsError } from '../../user/UserEmailAlreadyExistsError';
import { UserRepeatedPasswordWrongError } from '../../user/UserRepeatedPasswordWrongError';
import { User } from '../../user/User';
import { TestDatabase } from './TestDatabase';

describe('UserService Integration Tests (Real Database)', () => {
  let userService: UserService;
  let userRepository: PostgresUserRepository;
  let testEmail: string;
  let testDb: TestDatabase;

  beforeAll(async () => {
    testDb = await TestDatabase.create();

    userRepository = new PostgresUserRepository(testDb.getClient());
    userService = new UserService(
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
    const userData: UserRegistrationDto = {
      name: 'Integration Test User',
      email: testEmail,
      password: 'securePassword123!',
      repeatedPassword: 'securePassword123!',
    }

    const user = await userService.register(userData);

    expect(user).toBeInstanceOf(User);
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
    expect(user.passwordHash).not.toBe(userData.password);

    const dbUser = await userRepository.findByEmail(testEmail);
    expect(dbUser).toBeDefined();
    expect(dbUser?.id).toBe(user.id);
    expect(dbUser?.name).toBe(userData.name);
  });

  it('should throw UserEmailAlreadyExistsError when email exists', async () => {
    await userService.register({
      name: 'Existing User',
      email: testEmail,
      password: 'password123',
      repeatedPassword: 'password123',
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

    const user = await userService.register({
      name: 'Password Test User',
      email: uniqueEmail,
      password: plainPassword,
      repeatedPassword: plainPassword,
    });

    expect(user.passwordHash).not.toBe(plainPassword);
    expect(user.passwordHash.length).toBeGreaterThan(plainPassword.length);

    const dbUser = await userRepository.findByEmail(uniqueEmail);
    expect(dbUser?.passwordHash).toBe(user.passwordHash);
  });
});
