import { ResponseError } from './ResponseError';

export class NotFoundError extends ResponseError {
    constructor(message: string) {
        super(message);
        this.status = 404;
        this.reason = 'Not Found';
    }
}
