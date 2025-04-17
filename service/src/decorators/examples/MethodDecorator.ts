// npm run build && node ./build/decorators/examples/MethodDecorator.js

import 'reflect-metadata';
import assert from 'node:assert';

import { Methods } from '../../http/Methods';
import { METHOD_KEY, PATH_KEY } from '../constants';



function RequestMapping(method: string, path: string) {
  // eslint-disable-next-line
  return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(PATH_KEY, path, target, propertyKey);
    Reflect.defineMetadata(METHOD_KEY, Methods.GET, target, propertyKey);
    return target;
  }
}

class SomeController {
  @RequestMapping(Methods.GET, '/some')
  someMethod() {}
}

void function ShouldDefineMetadata() {
  const path = Reflect.getMetadata(PATH_KEY, SomeController.prototype, 'someMethod');
  assert.equal(path, '/some');
}();
