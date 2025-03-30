import { ResponseError } from './ResponseError';

export class NotFoundError extends ResponseError {
    constructor(reason?: string) {
        super('Not Found', 404);
        this.reason = reason;
    }
}
