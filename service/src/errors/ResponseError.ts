export abstract class ResponseError extends Error {
  status?: number;
  reason?: string;

  protected constructor(message?: string) {
    super(message);
  }
}
