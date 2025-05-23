
import { Controller, UseErrorMapper } from '../../decorators';
import { BadRequestError } from '../../errors';
import { Post, RequestBody } from '../../http';
import { UserEmailAlreadyExistsError } from '../UserEmailAlreadyExistsError';
import { UserResponse } from '../UserResponse';

import { UserSignUpDto } from './UserSignUpDto';
import { UserSignUpService } from './UserSignUpService';

@UseErrorMapper(new Map([
  [UserEmailAlreadyExistsError, BadRequestError],
]))
@Controller('/public/sign-up')
export class UserSignUpController {
    constructor(private readonly userService: UserSignUpService) {
    }

    @Post()
    singUp(@RequestBody() body: UserSignUpDto): Promise<UserResponse> {
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
