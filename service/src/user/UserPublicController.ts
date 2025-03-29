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
        this.validateUserRegistrationDto(body);
        return this.userService.register(body);
    }

    private validateUserRegistrationDto(userRegistrationDto: UserRegistrationDto): void {
        if (!userRegistrationDto.name) {
            throw new BadRequestError('Name is required');
        }
        if (!userRegistrationDto.email) {
            throw new BadRequestError('Email is required');
        }
        if (!userRegistrationDto.password) {
            throw new BadRequestError('Password is required');
        }
        if (!userRegistrationDto.repeatedPassword) {
            throw new BadRequestError('Repeated password is required');
        }
    }
}
