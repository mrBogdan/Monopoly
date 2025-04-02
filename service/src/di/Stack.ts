export class Stack<T> {
  private stack: T[] = [];

  push(item: T): void {
    this.stack.push(item);
  }

  pop(): T {
    return this.stack.pop() as T;
  }

  top(): T {
    return this.stack[this.size() - 1] as T;
  }

  size(): number {
    return this.stack.length;
  }

  isEmpty(): boolean {
    return this.stack.length === 0;
  }
}
