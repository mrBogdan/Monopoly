import { Controller } from '../../../decorators/Controller';
import { Get } from '../../../decorators/Get';
import { getHandler } from '../../../http/getHandler';
import { Methods } from '../../../http/Methods';

describe('getHandler', () => {
  @Controller('/foo')
  class Foo {
    @Get('/bar')
    getBar() {
      return 'GetFooBar()';
    }

    @Get('')
    main() {
      return 'Main';
    }
  }

  @Controller('/')
  class Bar {
    @Get()
    foo() {
      return 'GetFooBar';
    }
  }

  it('should return correct controller and action', async () => {
    const result = getHandler(Methods.GET, '/foo/bar');
    expect(result).toEqual({
      class: Foo,
      method: 'getBar',
    })
  });

  it('should return correct index method', async () => {
    const result = getHandler(Methods.GET, '/foo');
    expect(result).toEqual({
      class: Foo,
      method: 'main',
    });
  });

  it('should return correct index method', async () => {
    const result = getHandler(Methods.GET, '/');
    expect(result).toEqual({
      class: Bar,
      method: 'foo',
    })
  })
});
