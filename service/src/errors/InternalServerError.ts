import { ResponseError } from './ResponseError';

export class InternalServerError extends ResponseError {
  constructor() {
    super('Internal Server Error');
    this.reason = '';
    this.status = 500;
  }
}
