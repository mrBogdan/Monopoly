import { ResponseError } from './ResponseError';

export class BadRequestError extends ResponseError {
  constructor(reason: string) {
    super('Bad Request');
    this.status = 400;
    this.reason = reason;
  }
}
