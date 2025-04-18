export class Reply<T> {
  constructor(
    public roomId: string,
    public userId: string,
    public data: T,
  ) {
  }
}
