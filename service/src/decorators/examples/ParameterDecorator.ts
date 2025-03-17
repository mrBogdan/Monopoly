// npm run build && node ./build/decorators/examples/ParameterDecorator.js

import 'reflect-metadata';
import assert from 'node:assert';

const requiredMetadataKey = Symbol('required');

function required(target: object, propertyKey: string | symbol, parameterIndex: number) {
  const existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

function validate(target: object, propertyName: string, descriptor: TypedPropertyDescriptor<(verbose: boolean) => string>) {
  const method = descriptor.value!;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  descriptor.value = function (...args: any[any]) {
    const requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
    if (requiredParameters) {
      for (const parameterIndex of requiredParameters) {
        if (parameterIndex >= args.length || args[parameterIndex] === undefined) {
          throw new Error('Missing required argument.');
        }
      }
    }
    return method.apply(this, args);
  };
}

class BugReport {
  type = 'report';
  title: string;

  constructor(t: string) {
    this.title = t;
  }

  @validate
  print(@required verbose?: boolean) {
    if (verbose) {
      return `type: ${this.type}\ntitle: ${this.title}`;
    } else {
      return this.title;
    }
  }
}

void function ShouldValidateRequiredParam() {
  const report = new BugReport('Needs more jQuery');
  assert.throws(() => report.print(), {
    message: 'Missing required argument.'
  });
  assert.equal(report.print(true), 'type: report\ntitle: Needs more jQuery');
  assert.equal(report.print(false), 'Needs more jQuery');
}();
