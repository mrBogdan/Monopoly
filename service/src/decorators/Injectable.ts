export function Injectable() {
  return function <T extends { new(...args: never[]): object }>(constructor: T) {
    return constructor;
  };
}
