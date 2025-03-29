import { UserService } from './UserService';
import { Controller } from '../decorators/Controller';
import { Post } from '../decorators/Post';
import { RequestBody } from '../decorators/RequestBody';
import { UserRegistrationDto } from './UserRegistrationDto';
import { User } from './User';
import { UseErrorMapper } from '../decorators/UseErrorMapper';
import { UserEmailAlreadyExistsError } from './UserEmailAlreadyExistsError';
import { BadRequestError } from '../errors/BadRequestError';

@UseErrorMapper(new Map([
  [UserEmailAlreadyExistsError, BadRequestError],
]))
@Controller('/public/sign-up')
export class UserPublicController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    singUp(@RequestBody() body: UserRegistrationDto): Promise<User> {
        return this.userService.register(body);
    }
}
