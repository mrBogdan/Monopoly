export class Reply<T> {
  constructor(
    public roomId: string,
    public replyTo: string,
    public payload: T,
  ) {
  }
}
