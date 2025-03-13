import { InvalidEmailError } from '../InvalidEmailError';

export function Email(target: unknown, propertyKey: string) {
  let value: string;

  Object.defineProperty(target, propertyKey, {
    get: () => value,
    set: (newValue: string) => {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newValue)) {
        throw new InvalidEmailError(newValue);
      }

      value = newValue;
    },
    enumerable: true,
    configurable: true
  });
}
