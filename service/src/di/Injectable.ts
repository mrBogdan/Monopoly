import 'reflect-metadata';

export function Injectable() {
  return function (target: object) {
    const paramTypes = Reflect.getMetadata('design:paramtypes', target) || [];
    Reflect.defineMetadata('design:paramtypes', paramTypes, target);
  }
}
