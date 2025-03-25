export abstract class ResponseError extends Error {
  status: number;
  reason?: string;

  protected constructor(message?: string, status?: number) {
    super(message);
    this.status = status || 500;
  }
}
