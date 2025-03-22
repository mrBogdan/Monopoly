export class BadRouteError extends Error {
    constructor(route: string) {
        super(`Bad route: ${route}`);
    }
}
