import 'reflect-metadata';

interface InjectableMetadata {
  valueSource?: boolean
}

export interface Gettable {
  get(key: string): unknown;
}

let valueSource: Gettable;

export function Injectable(metadata?: InjectableMetadata): ClassDecorator {
  return function (target: object) {
    const paramTypes = Reflect.getMetadata('design:paramtypes', target) || [];
    Reflect.defineMetadata('design:paramtypes', paramTypes, target);
    if (metadata?.valueSource) {
      if (valueSource) {
        throw new Error('ValueSource already defined');
      }

      checkValueInterface(target);

      valueSource = target as Gettable;
    }
  }
}

export const getValueSource = (): Gettable => {
  if (!valueSource) {
    throw new Error('ValueSource not defined. Need to use @Injectable({valueSource: true}) decorator with Gettable interface');
  }

  return valueSource;
}

const checkValueInterface = (target: object): void => {
  const hasGetMethod = Reflect.ownKeys((target as CallableFunction).prototype).includes('get');

  if (!hasGetMethod) {
    throw new Error(`ValueSource ${target} must implement get method`);
  }
}
