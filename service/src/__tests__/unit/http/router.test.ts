import { Methods } from '../../../http/Methods';
import { EmptyHandler } from '../../../http/router/EmptyHandler';
import { RouteTree } from '../../../http/router/RouteTree';
import { NotFoundError } from '../../../errors/NotFoundError';
import { MethodNotAllowedError } from '../../../errors/MethodNotAllowedError';
import { Route } from '../../../http/router/Route';
import { Handler } from '../../../http/router/Handler';

// / & /:id
// POST /public/user/:id
// GET /public/user/:id
// GET /public/game/:id
// GET /
// GET /:param

describe('Router tests', () => {
  const verifyRoute = (route: Route, path: string, method: Methods, handler: Handler, withParameters?: {param: string, value: string}[]) => {
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
    tree.addRoute(path, Methods.GET, EmptyHandler.of());
    const route = tree.findRoute(specificPath, Methods.GET);

    verifyRoute(route, path, Methods.GET, EmptyHandler.of(), [{param: 'id', value: '123'}]);
  });

  it('should throw error when route not found', async () => {
    const tree = new RouteTree();
    const path = '/public/user/@id';
    const specificPath = '/public/user';
    const handler = EmptyHandler.of()
    tree.addRoute(path, Methods.GET, handler);
    expect(() => {
      tree.findRoute(specificPath, Methods.POST);
    }).toThrowError(MethodNotAllowedError);
  });

  it('should throw error when route not found', async () => {
    const tree = new RouteTree();
    const path = '/public/user/@id';
    const specificPath = '/incorrect/user/123';
    const handler = EmptyHandler.of()
    tree.addRoute(path, Methods.GET, handler);
    expect(() => {
      tree.findRoute(specificPath, Methods.GET);
    }).toThrowError(NotFoundError);
  });

  it('should handle few routes on the same level', () => {
    const tree = new RouteTree();
    const path1 = '/public/user/image';
    const path2 = '/public/user/list';

    tree.addRoute(path1, Methods.GET, EmptyHandler.of());
    tree.addRoute(path2, Methods.GET, EmptyHandler.of());

    const route1 = tree.findRoute(path1, Methods.GET);
    const route2 = tree.findRoute(path2, Methods.GET);

    verifyRoute(route1, path1, Methods.GET, EmptyHandler.of());
    verifyRoute(route2, path2, Methods.GET, EmptyHandler.of());
  });

  it('should handle two routes where one of them is dynamic', () => {
    const tree = new RouteTree();
    const path1 = '/public/user/@id';
    const path2 = '/public/user/list';

    tree.addRoute(path1, Methods.GET, EmptyHandler.of());
    tree.addRoute(path2, Methods.GET, EmptyHandler.of());

    const route1 = tree.findRoute(path1, Methods.GET);
    const route2 = tree.findRoute(path2, Methods.GET);

    verifyRoute(route1, path1, Methods.GET, EmptyHandler.of(), [{param: 'id', value: '@id'}]);
    verifyRoute(route2, path2, Methods.GET, EmptyHandler.of());
  });

  it('should handle static path after dynamic path', () => {
    const tree = new RouteTree();
    const path = '/public/user/@id/image';

    tree.addRoute(path, Methods.GET, EmptyHandler.of());

    const route = tree.findRoute(path, Methods.GET)

    verifyRoute(route, path, Methods.GET, EmptyHandler.of(), [{param: 'id', value: '@id'}]);
  });

  it('should not give to set two dynamic paths on the same level', () => {
    const tree = new RouteTree();
    const path1 = '/public/user/@id';
    const path2 = '/public/user/@name';

    tree.addRoute(path1, Methods.GET, EmptyHandler.of());
    expect(() => {
      tree.addRoute(path2, Methods.GET, EmptyHandler.of());
    }).toThrowError();
  });

  it('should handle root path', () => {
    const tree = new RouteTree();
    const path = '/';

    tree.addRoute(path, Methods.GET, EmptyHandler.of());

    const route = tree.findRoute(path, Methods.GET);

    verifyRoute(route, path, Methods.GET, EmptyHandler.of());
  });

  it('should handle root path with dynamic path', () => {
    const tree = new RouteTree();
    const path = '/@param';

    tree.addRoute(path, Methods.GET, EmptyHandler.of());

    const route = tree.findRoute(path, Methods.GET);

    verifyRoute(route, path, Methods.GET, EmptyHandler.of(), [{param: 'param', value: '@param'}]);
  });

  it('should handle root path with static path', () => {
    const tree = new RouteTree();
    const path = '/public';

    tree.addRoute(path, Methods.GET, EmptyHandler.of());

    const route = tree.findRoute(path, Methods.GET);

    verifyRoute(route, path, Methods.GET, EmptyHandler.of());
  });

  it('should be possible to add few dynamic paths on the same level', () => {
    const tree = new RouteTree();
    const path1 = '/public/user/@id';
    const path2 = `${path1}/@param`;

    tree.addRoute(path1, Methods.GET, EmptyHandler.of());
    tree.addRoute(path2, Methods.POST, EmptyHandler.of());

    const route1 = tree.findRoute(path1, Methods.GET);
    const route2 = tree.findRoute(path2, Methods.POST);

    verifyRoute(route1, path1, Methods.GET, EmptyHandler.of(), [{param: 'id', value: '@id'}]);
    verifyRoute(route2, path2, Methods.POST, EmptyHandler.of(), [{param: 'param', value: '@param'}, {param: 'id', value: '@id'}]);
  });

  it('should be possible to add multiple handlers for the same route', () => {
    const tree = new RouteTree();
    const path = '/public/user/@id';

    tree.addRoute(path, Methods.GET, EmptyHandler.of());
    tree.addRoute(path, Methods.POST, EmptyHandler.of());

    const route1 = tree.findRoute(path, Methods.GET);
    const route2 = tree.findRoute(path, Methods.POST);

    verifyRoute(route1, path, Methods.GET, EmptyHandler.of(), [{param: 'id', value: '@id'}]);
    verifyRoute(route2, path, Methods.POST, EmptyHandler.of(), [{param: 'id', value: '@id'}]);
  });
});
