import { ResponseError } from './ResponseError';

export class NotFoundError extends ResponseError {
    constructor(message?: string) {
        super('Not Found');
        this.status = 404;
        this.reason = message;
    }
}
