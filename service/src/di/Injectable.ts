import 'reflect-metadata';

export function Injectable(): ClassDecorator {
  return function (target: object) {
    const paramTypes = Reflect.getMetadata('design:paramtypes', target) || [];
    Reflect.defineMetadata('design:paramtypes', paramTypes, target);
  }
}
