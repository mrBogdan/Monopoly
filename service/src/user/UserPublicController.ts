import { Controller } from '../decorators/Controller';
import { Post } from '../decorators/Post';
import { RequestBody } from '../decorators/RequestBody';
import { UseErrorMapper } from '../decorators/UseErrorMapper';
import { BadRequestError } from '../errors/BadRequestError';

import { UserEmailAlreadyExistsError } from './UserEmailAlreadyExistsError';
import { UserRegistrationDto } from './UserRegistrationDto';
import { UserResponse } from './UserResponse';
import { UserService } from './UserService';

@UseErrorMapper(new Map([
  [UserEmailAlreadyExistsError, BadRequestError],
]))
@Controller('/public/sign-up')
export class UserPublicController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    singUp(@RequestBody() body: UserRegistrationDto): Promise<UserResponse> {
        this.validateUserRegistrationDto(body as unknown as Record<string, unknown>);
        return this.userService.register(body);
    }

    private validateUserRegistrationDto(userRegistrationDto: Record<string, unknown>): void {
        ['name', 'email', 'password', 'repeatedPassword'].forEach((field) => {
            if (!userRegistrationDto[field]) {
                throw new BadRequestError(`${field} is required`);
            }
        });
    }
}
