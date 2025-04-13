// npm run build && node ./build/decorators/examples/MethodDecorator.js

import 'reflect-metadata';
import assert from 'node:assert';

import { METHOD_KEY, PATH_KEY } from '../constants';
import { Methods } from '../../http/Methods';

function RequestMapping(method: string, path: string) {
  // eslint-disable-next-line
  return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(PATH_KEY, path, target, propertyKey);
    Reflect.defineMetadata(METHOD_KEY, method, target, propertyKey);
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
