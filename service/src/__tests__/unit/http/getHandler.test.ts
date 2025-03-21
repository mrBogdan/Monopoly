import { Controller } from '../../../decorators/Controller';
import { Get } from '../../../decorators/Get';
import { parseRoute } from '../../../http/parseRoute';
import { Methods } from '../../../http/Methods';

describe('getHandler', () => {
  @Controller('/foo')
  class Foo {
    @Get('/bar')
    getBar() {
      return 'GetFooBar()';
    }

    @Get()
    getFoo() {
      return 'Main';
    }
  }

  @Controller('/')
  class Bar {
    @Get()
    foo() {
      return 'GetBarFoo()';
    }
  }

  it('should thrown not found error if no handler found', async () => {
    expect(() => parseRoute(Methods.GET, '/no-path')).toThrow();
  });

  it('should return correct controller and action', async () => {
    const result = parseRoute(Methods.GET, '/foo/bar');
    expect(result).toEqual({
      class: Foo,
      method: 'getBar',
    })
  });

  it('should return correct action handler', async () => {
    const result = parseRoute(Methods.GET, '/foo');
    expect(result).toEqual({
      class: Foo,
      method: 'getFoo',
    });
  });

  it('should return correct controller index handler', async () => {
    const result = parseRoute(Methods.GET, '/');
    expect(result).toEqual({
      class: Bar,
      method: 'foo',
    })
  })
});
