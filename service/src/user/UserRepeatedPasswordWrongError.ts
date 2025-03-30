export class UserRepeatedPasswordWrongError extends Error {
    constructor() {
        super('Incorrect password or repeated password');
    }
}
