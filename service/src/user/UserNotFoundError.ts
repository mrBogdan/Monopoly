export class UserNotFoundError extends Error {
    constructor(userIdOrEmail: string) {
        super(`User ${userIdOrEmail} not found}`);
    }
}
