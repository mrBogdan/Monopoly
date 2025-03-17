// npm run build && node ./build/decorators/examples/ParamTypes.js

import 'reflect-metadata';
import assert from 'node:assert';

// eslint-disable-next-line
function ParamTypes(target: object, methodName: string, descriptor: PropertyDescriptor) {
  const paramTypes = Reflect.getMetadata('design:paramtypes', target, methodName);

  Reflect.defineMetadata('paramtypes', paramTypes, target, methodName);
}

class Foo {}

class Example {
  constructor() {
  }

  @ParamTypes
  method(param1: number, param2: string, param3: Foo): string {
    return param1 + param2.length + param3.constructor.name;
  }
}

void function ShouldLogParamTypes() {
  const example = new Example();

  const paramTypes = Reflect.getMetadata('paramtypes', example, 'method');

  assert(paramTypes[0] === Number);
  assert(paramTypes[1] === String);
  assert(paramTypes[2] === Foo);
}();
