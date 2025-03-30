import 'reflect-metadata';

import { Controller, getControllers } from '../../../decorators/Controller';
import { PATH_KEY } from '../../../decorators/constants';

@Controller('/shape')
class Shape {}


describe('Controller decorator', () => {
  it('should define metadata', () => {
    const path = Reflect.getMetadata(PATH_KEY, Shape);
    expect(path).toBe('/shape');
  });

  it('should return constructor', () => {
    const controllers = getControllers();
    expect(controllers.get('/shape')).toBe(Shape);
  });
});
