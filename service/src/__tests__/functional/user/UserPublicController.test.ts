import { Server } from 'node:http';

import request from 'supertest';

import { AppModule } from '../../../AppModule';
import { USER_REPOSITORY, UserRepository } from '../../../user';
import { runTestApp, TestApp } from '../runTestApp';

jest.setTimeout(15000);

describe('UserPublicController', () => {
  let listeningServer: Server;
  let app: TestApp;
  let userRepository: UserRepository;

  const verifyUser = async (id: string, email: string, name: string) => {
    const user = await userRepository.findByEmail(email);
    expect(user).toBeDefined();
    expect(user?.id).toEqual(id);
    expect(user?.name).toEqual(name);
    expect(user?.email).toEqual(email);
  };

  beforeAll(async () => {
    app = await runTestApp(AppModule);
    listeningServer = app.get<Server>(Server);
    userRepository = app.get<UserRepository>(USER_REPOSITORY);
  });

  afterAll(async () => {
    await app.gracefulShutdown();
  });

  describe('singUp', () => {
    it('should throw error on empty body', async () => {
      const response = await request(listeningServer).post('/public/sign-up').send({});
      expect(response.status).toBe(400);
      expect(response.body.reason).toEqual('name is required');
    });

    it('should register user', async () => {
      const user = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'securePassword123!',
        repeatedPassword: 'securePassword123!',
      };
      const response = await request(listeningServer).post('/public/sign-up').send(user);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: expect.any(String),
        name: user.name,
        email: user.email,
      });
      await verifyUser(response.body.id, response.body.email, response.body.name);
    });
  });
});
