import { ResponseError } from './ResponseError';

export class InternalServerError extends ResponseError {
  constructor() {
    super('Internal Server Error', 500);
    this.reason = '';
  }
}
