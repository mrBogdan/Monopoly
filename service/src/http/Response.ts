import { ResponseBuilder } from './ResponseBuilder';

export class Response {
  constructor(
    public readonly body?: unknown,
    public readonly headers?: Record<string, string>,
    public readonly statusCode: number = 200,
  ) {}

  static builder(): ResponseBuilder {
    return new ResponseBuilder();
  }
}
