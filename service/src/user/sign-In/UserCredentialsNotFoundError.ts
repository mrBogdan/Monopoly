export class UserCredentialsNotFoundError extends Error {
    constructor() {
        super('User email or password error');
    }
}
