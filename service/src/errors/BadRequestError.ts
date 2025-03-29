import { ResponseError } from './ResponseError';

export class BadRequestError extends ResponseError {
  constructor(reason: string) {
    super('Bad Request', 400);
    this.reason = reason;
  }
}
