import { UserService } from './UserService';
import { Controller } from '../decorators/Controller';
import { Post } from '../http/Post';
import { RequestBody } from '../http/RequestBody';
import { UserRegistrationDto } from './UserRegistrationDto';
import { UseErrorMapper } from '../decorators/UseErrorMapper';
import { UserEmailAlreadyExistsError } from './UserEmailAlreadyExistsError';
import { BadRequestError } from '../errors/BadRequestError';
import { UserResponse } from './UserResponse';

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
