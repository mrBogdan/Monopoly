// npm run build && node ./build/decorators/DecoratorExample.js

import 'reflect-metadata';
import * as assert from 'node:assert';

import { Methods } from '../http/Methods';
import { NotFoundError } from '../errors/NotFoundError';
import { METHOD_KEY, PATH_KEY } from './constants';

const paramMetadataKey = Symbol('paramMetadata');

const controllerMetadataKey = Symbol('controllerMetadata');

const controllers = new Map();

function Controller(path: string) {
  return function SimpleClassDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    Reflect.defineMetadata(controllerMetadataKey, path, constructor);
    controllers.set(path, constructor);
    return constructor;
  };
}

function RequestMapping(method: string, path: string) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(PATH_KEY, path, target, propertyKey);
    Reflect.defineMetadata(METHOD_KEY, Methods.GET, target, propertyKey);
    return target;
  }
}

function Get(path: string) {
  return RequestMapping(Methods.GET, path);
}

function Param(paramName: string) {
  return function (target: Object, propertyKey: string, parameterIndex: number) {
    let existingParameters: number[] = Reflect.getOwnMetadata(paramMetadataKey, target, propertyKey) || [];
    existingParameters.push(parameterIndex);
  };
}

function ParamTypes(target: Function) {
  const paramTypes = Reflect.getMetadata('design:paramtypes', target);
  console.log({paramTypes});
}

@Controller('/shape')
class Shape {
  private id: number = 0;

  constructor(public service: number) {
  }

  @Get('/color')
  getColor() {
    return 'getColor()';
  }

  getSize() {
    this.id++;
    return 'getSize()';
  }

  getId() {
    return this.id;
  }
}

@Controller('/')
class Foo {

}

const getHandler = (method: string, url: string) => {
  const paths: string[] = Array.from(controllers.keys());

  const splitUrl = url.split('/').filter(v => v);

  if (splitUrl.length > 1) {

    const p = `/${splitUrl.shift()}`;
    let Controller = null;

    if (paths.includes(p)) {
      Controller = controllers.get(p);
    }

    if (!Controller) {
      throw new NotFoundError('Handler not found');
    }

    for (const path of splitUrl) {
      const p = `/${path}`;

      const handlers = Object.getOwnPropertyNames(Controller.prototype);

      for (const handler of handlers) {
        const handlerPath = Reflect.getOwnMetadata(PATH_KEY, Controller.prototype, handler);

        if (handlerPath === p) {
          return {
            class: Controller,
            method: handler,
          }
        }
      }

      throw new NotFoundError('Handler not found');;
    }
  }
};


void function ShouldReturnCorrectHandler() {
  const handler = getHandler('GET', '/shape/color');

  const controller = new handler!.class(1);
  const response = controller[handler!.method]();

  assert.equal(handler?.class, Shape);
  assert.equal(handler?.method, 'getColor');
  assert.equal(response, 'getColor()');
}();
