import { RouteHandler } from '../../../../http/router/RouteHandler';
import { Router } from '../../../../http/router/Router';
import { Methods } from '../../../../http/Methods';
import { Handler } from '../../../../http/router/Handler';
import { Controller } from '../../../../decorators/Controller';
import { Get } from '../../../../decorators/Get';

@Controller('public/user')
class UserController {
  @Get('/@id')
  public getUser() {
    return 'user';
  }
}

describe('Router tests', () => {
  const _verifyRouter = (router: Router, path: string, method: Methods, handler: Handler) => {
    const route = router.findRoute(path, method);
    expect(route).toBeDefined();
    expect(route.handler()).toBeDefined();
    expect(route.buildPath()).toBe(path);
    expect(route.handler()).toEqual(handler);
    expect(route.method()).toBe(method);
  };

  it('should build routes', async () => {
    const router = new Router();
    const path = '/public/user/@id';
    const specificPath = '/public/user/123';
    router.get(path, RouteHandler.empty());

    _verifyRouter(router, specificPath, Methods.GET, RouteHandler.empty());
  });

  it('should build routes with controller', async () => {
    const router = new Router();
    router.buildRoutes();
    const path = '/public/user/@id';
    const specificPath = '/public/user/123';

    _verifyRouter(router, path, Methods.GET, new RouteHandler('UserController', 'getUser'));

    const route = router.findRoute(specificPath, Methods.GET);
    expect(route).toBeDefined();
    expect(route.handler()).toBeDefined();
    expect(route.buildPath()).toBe(path);
    expect(route.handler()).toEqual(new RouteHandler('UserController', 'getUser'));
    expect(route.method()).toBe(Methods.GET);
    expect(route.getParams().get('id')).toBe('123');
  });
});
