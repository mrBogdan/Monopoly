
export const ROUTE_SECURITY = Symbol('ROUTE_SECURITY');

export interface RouteSecurity {
    secure(authorizationHeader?: string): void;
}