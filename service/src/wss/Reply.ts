export class Reply<T> {
  constructor(
    public type: string,
    public replyTo: string,
    public payload: T,
  ) {
  }
}
