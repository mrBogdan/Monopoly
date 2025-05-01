import jwt from 'jsonwebtoken';
import {TokenPayload} from "./TokenPayload";
import {ConfigService} from "../config/ConfigService";
import {Injectable} from "../di/Injectable";

@Injectable()
export class JwtTokenService {
    readonly ACCESS_TOKEN_EXPIRY = '15m';
    readonly JWT_TOKEN: string;
    readonly REFRESH_TOKEN_EXPIRY = '7d';

    constructor(private configService: ConfigService) {
        this.JWT_TOKEN = this.configService.get('jwtSecret') as string;
    }

    generateAccessToken(payload: TokenPayload): string {
        return jwt.sign(payload, this.JWT_TOKEN, { expiresIn: this.ACCESS_TOKEN_EXPIRY });
    }

    generateRefreshToken (payload: TokenPayload): string {
        return jwt.sign(payload, this.JWT_TOKEN, { expiresIn: this.REFRESH_TOKEN_EXPIRY });
    }

    verifyToken(token: string): TokenPayload {
        return jwt.verify(token, this.JWT_TOKEN) as TokenPayload;
    }
}