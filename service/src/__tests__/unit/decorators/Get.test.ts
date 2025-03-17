import 'reflect-metadata';

import { Get } from '../../../decorators/Get';
import { METHOD_KEY, PATH_KEY } from '../../../decorators/constants';

class Shape {
  @Get('/color')
  getColor() {
    return 'GetColor()';
  }
}

describe('Get decorator', () => {
  it('should define metadata', () => {
    const path = Reflect.getMetadata(PATH_KEY, Shape.prototype, 'getColor');
    const method = Reflect.getMetadata(METHOD_KEY, Shape.prototype, 'getColor');
    expect(path).toBe('/color');
    expect(method).toBe('GET');
  });
});
