export class Response {
  constructor(private status: number, private body?: any, private headers?: Record<string, string>) {}

  public static of() {}
}
