export class Optional<T> {
  constructor(private readonly value?: T) {}

  public static of<T>(value?: T): Optional<T> {
    return new Optional(value);
  }

  public static empty() {
    return new Optional(null);
  }

  isEmpty(): boolean {
    return this.value === undefined || this.value === null;
  }

  get(): T | undefined {
    return this.value;
  }
}
