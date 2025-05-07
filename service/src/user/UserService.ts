import { Inject, Injectable } from '../di';

import { User } from './User';
import { USER_REPOSITORY, UserRepository } from './UserRepository';


@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: UserRepository,
  ) {}

  async getUser(id: string): Promise<User> {
    return this.userRepository.getById(id);
  }
}
