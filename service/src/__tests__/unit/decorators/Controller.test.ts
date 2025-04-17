import 'reflect-metadata';

import { PATH_KEY } from '../../../decorators/constants';
import { Controller, getControllers } from '../../../decorators/Controller';

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
