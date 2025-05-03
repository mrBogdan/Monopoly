import {Inject} from '../../di/Inject';
import {Injectable} from '../../di/Injectable';
import {Hasher} from '../../hasher/Hasher';
import {JwtTokenService} from '../../jwtToken/JwtTokenService';
import {USER_REPOSITORY, UserRepository} from '../UserRepository';

import {SignInResult} from './SignInResult';
import {UserCredentialsNotFoundError} from './UserCredentialsNotFoundError';
import {UserSignInDto} from './UserSignInDto';



@Injectable()
export class UserSignInService {
    constructor(
        private jwtTokenService: JwtTokenService,
        @Inject(USER_REPOSITORY) private userRepository: UserRepository,
        private userPasswordHasher: Hasher,
    ) {
    }

    async signIn(userSignInDataDto: UserSignInDto): Promise<SignInResult> {
        const {email, password} = userSignInDataDto;

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new UserCredentialsNotFoundError();
        }

        if (user.passwordHash !== this.userPasswordHasher.hash(password)) {
            throw new UserCredentialsNotFoundError();
        }

        return new SignInResult(
            user.id,
            user.email,
            this.jwtTokenService.generateAccessToken({userId: user.id}),
            this.jwtTokenService.generateRefreshToken({userId: user.id})
        );
    }
}
