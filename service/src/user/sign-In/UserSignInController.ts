import { Controller } from '../../decorators';
import { BadRequestError } from '../../errors';
import { Post, RequestBody, Response } from '../../http';

import {UserSignInDto} from './UserSignInDto';
import {UserSignInService} from './UserSignInService';

@Controller('/public/sign-in')
export class UserSignInController {
    constructor(private readonly userService: UserSignInService) {
    }

    @Post()
    async signIn(@RequestBody() userSignInDto: UserSignInDto): Promise<Response> {
        this.validateUserRegistrationDto(userSignInDto as unknown as Record<string, unknown>);
        const signInResult = await this.userService.signIn(userSignInDto);

        return Response.builder()
            .setBody(signInResult)
            .setHeader('accessToken', signInResult.accessToken)
            .setHeader('refreshToken', signInResult.refreshToken)
            .build();
    }

    private validateUserRegistrationDto(userRegistrationDto: Record<string, unknown>): void {
        ['email', 'password'].forEach((field) => {
            if (!userRegistrationDto[field]) {
                throw new BadRequestError(`${field} is required`);
            }
        });
    }
}
