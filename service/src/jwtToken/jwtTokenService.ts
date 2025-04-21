import jwt from 'jsonwebtoken';
import {TokenPayload} from "./tokenPayload";

export class JwtTokenService {
    readonly JWT_SECRET: string = process.env.JWT_SECRET || 'incorrect jwt secret';
    readonly ACCESS_TOKEN_EXPIRY = '15m';
    readonly REFRESH_TOKEN_EXPIRY = '7d';

    generateAccessToken = (payload: TokenPayload): string => {
        return jwt.sign(payload, this.JWT_SECRET, { expiresIn: this.ACCESS_TOKEN_EXPIRY });
    }

    generateRefreshToken = (payload: TokenPayload): string => {
        return jwt.sign(payload, this.JWT_SECRET, { expiresIn: this.REFRESH_TOKEN_EXPIRY });
    }

    verifyToken = (token: string): TokenPayload => {
        return jwt.verify(token, this.JWT_SECRET) as TokenPayload;
    }
}