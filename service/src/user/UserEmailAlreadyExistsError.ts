export class UserEmailAlreadyExistsError extends Error {
    constructor(email: string) {
        super(`User email ${email} already exists`);
    }
}
