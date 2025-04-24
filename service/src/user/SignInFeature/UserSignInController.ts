import {Controller} from '../../decorators/Controller';
import {Post} from '../../decorators/Post';
import {RequestBody} from '../../decorators/RequestBody';
import {UserSignInDto} from './UserSignInDto';
import {BadRequestError} from '../../errors/BadRequestError';
import {UserSignInService} from "./UserSignInService";
import {Response} from "../../http/Response";

@Controller('/public/sign-in')
export class UserSignInController {
    constructor(private readonly userService: UserSignInService) {
    }

    @Post()
    async singIn(@RequestBody() userSignInDto: UserSignInDto): Promise<Response> {
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
