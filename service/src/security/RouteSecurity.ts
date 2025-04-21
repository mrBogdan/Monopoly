import http from "node:http";

export const ROUTE_SECURITY = Symbol('ROUTE_SECURITY');

export interface RouteSecurity {
    secure(req: http.IncomingMessage): void;
}