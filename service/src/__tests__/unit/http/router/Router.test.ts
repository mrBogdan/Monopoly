import { RouteHandler } from '../../../../http/router/RouteHandler';
import { Router } from '../../../../http/router/Router';
import { Methods } from '../../../../http/Methods';
import { Handler } from '../../../../http/router/Handler';
import { Controller } from '../../../../decorators/Controller';
import { Get } from '../../../../http/Get';

@Controller('public/user')
class UserController {
  constructor(private num: number) {
  }
  @Get('/@id')
  public getUser() {
    return 'user';
  }
}

@Controller('health')
class HealthController {
  @Get()
  public getHealth() {
    return 'health';
  }
}

describe('Router tests', () => {
  const _verifyRouter = (router: Router, path: string, specificPath: string, method: Methods, handler: Handler, withParams?: { param: string, value: string }[]) => {
    const route = router.findRoute(specificPath, method);
    expect(route).toBeDefined();
    expect(route?.handler()).toBeDefined();
    expect(route?.buildPath()).toBe(path);
    expect(route?.handler()).toEqual(handler);
    expect(route?.method()).toBe(method);

    if (withParams) {
      for (const withParam of withParams) {
        expect(route?.getParams().get(withParam.param)).toBe(withParam.value);
      }
    }
  };

  it('should build routes', () => {
    const router = new Router();
    const path = '/public/user/@id';
    const specificPath = '/public/user/123';
    router.get(path, RouteHandler.empty());

    _verifyRouter(router, path, specificPath, Methods.GET, RouteHandler.empty());
  });

  it('should build routes with controller', () => {
    const router = new Router();
    const path = '/public/user/@id';
    const specificPath = '/public/user/123';

    _verifyRouter(router, path, specificPath, Methods.GET, new RouteHandler(UserController, 'getUser'), [{ param: 'id', value: '123' }]);
  });

  it('should build routes for root path', () => {
    const router = new Router();
    const path = '/health';

    _verifyRouter(router, path, path, Methods.GET, new RouteHandler(HealthController, 'getHealth'));
  });
});
