export class UnauthorizedError extends Error {
    constructor(text: string) {
        super(text);
    }
}
