import 'reflect-metadata';

import { RequestMapping } from '../../../decorators/RequestMapping';
import { Methods } from '../../../http/Methods';
import { METHOD_KEY, PATH_KEY } from '../../../decorators/constants';

class Shape {
  @RequestMapping('/color')
  getColor() {
    return 'GetColor()';
  }

  @RequestMapping('/size', Methods.POST)
  setColor() {
    return 'SetColor()';
  }
}

describe('RequestMapping decorator', () => {
  it('should define metadata with default GET method', () => {
    const path = Reflect.getMetadata(PATH_KEY, Shape.prototype, 'getColor');
    const method = Reflect.getMetadata(METHOD_KEY, Shape.prototype, 'getColor');
    expect(path).toBe('/color');
    expect(method).toBe('GET');
  });

  it('should define metadata with POST method', () => {
    const path = Reflect.getMetadata(PATH_KEY, Shape.prototype, 'setColor');
    const method = Reflect.getMetadata(METHOD_KEY, Shape.prototype, 'setColor');
    expect(path).toBe('/size');
    expect(method).toBe('POST');
  });
});
