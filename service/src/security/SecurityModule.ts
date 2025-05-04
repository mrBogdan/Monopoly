import { Module } from '../decorators/Module';
import { JwtTokenService } from '../jwtToken/JwtTokenService';

import {JWT_ROUTE_SECURITY, JwtRouteSecurity} from './JwtRouteSecurity';

@Module({
    services: [JwtRouteSecurity, JWT_ROUTE_SECURITY, JwtTokenService],
})
export class SecurityModule {}
