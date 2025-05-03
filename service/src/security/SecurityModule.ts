import { Module } from '../decorators/Module';

import {JWT_ROUTE_SECURITY, JwtRouteSecurity} from './JwtRouteSecurity';

@Module({
    services: [JwtRouteSecurity, JWT_ROUTE_SECURITY],
})
export class SecurityModule {}
