import {TokenExpiredError} from 'jsonwebtoken';

import {Injectable} from '../di/Injectable';
import {JwtTokenService} from '../jwtToken/JwtTokenService'

import {ROUTE_SECURITY, RouteSecurity} from './RouteSecurity';
import { UnauthorizedError } from './UnauthorizedError';

@Injectable()
export class JwtRouteSecurity implements RouteSecurity
{
    constructor(private jwtTokenService: JwtTokenService) {
    }

    async secure(token?: string) {
        if (!token || !token.startsWith('Bearer')) {
            throw new UnauthorizedError('Authorization header is required');
        }

        const tokenHash = token.split(' ')[1];
        if (!tokenHash) {
            throw new UnauthorizedError('Bearer token is required');
        }

        try {
            this.jwtTokenService.verifyToken(tokenHash);
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                throw new UnauthorizedError('Token expired');
            }
            throw new UnauthorizedError('Invalid token');
        }
    }
}

export const JWT_ROUTE_SECURITY = {
    param: ROUTE_SECURITY,
    useClass: JwtRouteSecurity,
}
