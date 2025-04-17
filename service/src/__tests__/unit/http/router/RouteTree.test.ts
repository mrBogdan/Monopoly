import { MethodNotAllowedError } from '../../../../errors/MethodNotAllowedError';
import { NotFoundError } from '../../../../errors/NotFoundError';
import { Methods } from '../../../../http/Methods';
import { BadRouteError } from '../../../../http/router/BadRouteError';
import { Handler } from '../../../../http/router/Handler';
import { Route } from '../../../../http/router/Route';
import { RouteHandler } from '../../../../http/router/RouteHandler';
import { RouteTree } from '../../../../http/router/RouteTree';

describe('Route Tree tests', () => {
  const _verifyRoute = (route: Route, path: string, method: Methods, handler: Handler, withParameters?: {param: string, value: string}[]) => {
    expect(route).toBeDefined();
    expect(route.handler()).toBeDefined();
    expect(route.buildPath()).toBe(path);
    expect(route.handler()).toEqual(handler);
    expect(route.method()).toBe(method);
    if (withParameters) {
      for (const withParameter of withParameters) {
        expect(route.getParams().get(withParameter.param)).toBe(withParameter.value);
      }
    }
  };

  it('should return correct controller and action', async () => {
    const tree = new RouteTree();
    const path = '/public/user/@id';
    const specificPath = '/public/user/123';
    tree.addRoute(path, Methods.GET, RouteHandler.empty());
    const route = tree.findRoute(specificPath, Methods.GET);

    _verifyRoute(route, path, Methods.GET, RouteHandler.empty(), [{param: 'id', value: '123'}]);
  });

  it('should throw error when route not found', async () => {
    const tree = new RouteTree();
    const path = '/public/user/@id';
    const specificPath = '/public/user';
    tree.addRoute(path, Methods.GET, RouteHandler.empty());
    expect(() => {
      tree.findRoute(specificPath, Methods.POST);
    }).toThrow(MethodNotAllowedError);
  });

  it('should throw error when route not found', async () => {
    const tree = new RouteTree();
    const path = '/public/user/@id';
    const specificPath = '/incorrect/user/123';
    tree.addRoute(path, Methods.GET, RouteHandler.empty());
    expect(() => {
      tree.findRoute(specificPath, Methods.GET);
    }).toThrow(NotFoundError);
  });

  it('should handle few routes on the same level', () => {
    const tree = new RouteTree();
    const path1 = '/public/user/image';
    const path2 = '/public/user/list';

    tree.addRoute(path1, Methods.GET, RouteHandler.empty());
    tree.addRoute(path2, Methods.GET, RouteHandler.empty());

    const route1 = tree.findRoute(path1, Methods.GET);
    const route2 = tree.findRoute(path2, Methods.GET);

    _verifyRoute(route1, path1, Methods.GET, RouteHandler.empty());
    _verifyRoute(route2, path2, Methods.GET, RouteHandler.empty());
  });

  it('should handle two routes where one of them is dynamic', () => {
    const tree = new RouteTree();
    const path1 = '/public/user/@id';
    const path2 = '/public/user/list';

    tree.addRoute(path1, Methods.GET, RouteHandler.empty());
    tree.addRoute(path2, Methods.GET, RouteHandler.empty());

    const route1 = tree.findRoute(path1, Methods.GET);
    const route2 = tree.findRoute(path2, Methods.GET);

    _verifyRoute(route1, path1, Methods.GET, RouteHandler.empty(), [{param: 'id', value: '@id'}]);
    _verifyRoute(route2, path2, Methods.GET, RouteHandler.empty());
  });

  it('should handle static path after dynamic path', () => {
    const tree = new RouteTree();
    const path = '/public/user/@id/image';

    tree.addRoute(path, Methods.GET, RouteHandler.empty());

    const route = tree.findRoute(path, Methods.GET)

    _verifyRoute(route, path, Methods.GET, RouteHandler.empty(), [{param: 'id', value: '@id'}]);
  });

  it('should not give to set two dynamic paths on the same level', () => {
    const tree = new RouteTree();
    const path1 = '/public/user/@id';
    const path2 = '/public/user/@name';

    tree.addRoute(path1, Methods.GET, RouteHandler.empty());
    expect(() => {
      tree.addRoute(path2, Methods.GET, RouteHandler.empty());
    }).toThrow(BadRouteError);
  });

  it('should handle root path', () => {
    const tree = new RouteTree();
    const path = '/';

    tree.addRoute(path, Methods.GET, RouteHandler.empty());

    const route = tree.findRoute(path, Methods.GET);

    _verifyRoute(route, path, Methods.GET, RouteHandler.empty());
  });

  it('should handle root path with dynamic path', () => {
    const tree = new RouteTree();
    const path = '/@param';

    tree.addRoute(path, Methods.GET, RouteHandler.empty());

    const route = tree.findRoute(path, Methods.GET);

    _verifyRoute(route, path, Methods.GET, RouteHandler.empty(), [{param: 'param', value: '@param'}]);
  });

  it('should handle root path with static path', () => {
    const tree = new RouteTree();
    const path = '/public';

    tree.addRoute(path, Methods.GET, RouteHandler.empty());

    const route = tree.findRoute(path, Methods.GET);

    _verifyRoute(route, path, Methods.GET, RouteHandler.empty());
  });

  it('should be possible to add few dynamic paths on the same level', () => {
    const tree = new RouteTree();
    const path1 = '/public/user/@id';
    const path2 = `${path1}/@param`;

    tree.addRoute(path1, Methods.GET, RouteHandler.empty());
    tree.addRoute(path2, Methods.POST, RouteHandler.empty());

    const route1 = tree.findRoute(path1, Methods.GET);
    const route2 = tree.findRoute(path2, Methods.POST);

    _verifyRoute(route1, path1, Methods.GET, RouteHandler.empty(), [{param: 'id', value: '@id'}]);
    _verifyRoute(route2, path2, Methods.POST, RouteHandler.empty(), [{param: 'param', value: '@param'}, {param: 'id', value: '@id'}]);
  });

  it('should be possible to add multiple handlers for the same route', () => {
    const tree = new RouteTree();
    const path = '/public/user/@id';

    tree.addRoute(path, Methods.GET, RouteHandler.empty());
    tree.addRoute(path, Methods.POST, RouteHandler.empty());

    const route1 = tree.findRoute(path, Methods.GET);
    const route2 = tree.findRoute(path, Methods.POST);

    _verifyRoute(route1, path, Methods.GET, RouteHandler.empty(), [{param: 'id', value: '@id'}]);
    _verifyRoute(route2, path, Methods.POST, RouteHandler.empty(), [{param: 'id', value: '@id'}]);
  });
});
