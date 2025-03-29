// npm run build && node ./build/decorators/examples/ClassDecorator.js

import 'reflect-metadata';
import assert from 'node:assert';

const controllerMetadataKey = Symbol('controllerMetadata');
const controllers = new Map();

function Controller(path: string) {
  // eslint-disable-next-line
  return function <T extends { new(...args: any[]): object }>(constructor: T) {
    Reflect.defineMetadata(controllerMetadataKey, path, constructor);
    controllers.set(path, constructor);
    return constructor;
  };
}

@Controller('shape')
class Shape {
}

void function ShouldDefineMetadata() {
  const path = Reflect.getMetadata(controllerMetadataKey, Shape);
  assert.equal(path, 'shape');
  assert.equal(controllers.get(path), Shape);
}()
