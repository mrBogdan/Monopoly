import { ResponseError } from './ResponseError';

export class ForbiddenError extends ResponseError {
  constructor(reason?: string) {
    super('Forbidden');
    this.status = 401;
    this.reason = reason;
  }
}
