export class Broadcast<T> {
  constructor(
    public type: string,
    public roomId: string,
    public payload: T,
  ) {}
}
