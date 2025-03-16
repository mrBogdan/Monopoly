import 'reflect-metadata';

function ParamTypes(target: any, methodName: string, descriptor: PropertyDescriptor) {
  const paramTypes = Reflect.getMetadata('design:paramtypes', target, methodName);

  paramTypes.forEach((param: any) => {
    console.log({typeName: param.name});
  })
}

class Example {
  constructor() {
  }

  @ParamTypes
  method(param1: number) {

  }
}

const example = new Example();
