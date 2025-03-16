const controllerMetadataKey = Symbol('controllerMetadata');
const controllers = new Map();

function Controller(path: string) {
  return function SimpleClassDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    Reflect.defineMetadata(controllerMetadataKey, path, constructor);
    controllers.set(path, constructor);
    return constructor;
  };
}
