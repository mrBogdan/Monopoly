import { ResponseError } from './ResponseError';

export class MethodNotAllowedError extends ResponseError {
    constructor(reason?: string) {
        super('Method Not Allowed', 405);
        this.reason = reason;
    }
}
