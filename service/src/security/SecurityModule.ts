import {JWT_ROUTE_SECURITY, JwtRouteSecurity} from "./JwtRouteSecurity";
import { Module } from '../decorators/Module';

@Module({
    services: [JwtRouteSecurity, JWT_ROUTE_SECURITY],
})
export class SecurityModule {}
