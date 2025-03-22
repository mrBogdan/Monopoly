import { Methods } from '../../../http/Methods';
import { EmptyHandler } from '../../../http/router/EmptyHandler';
import { RouteTree } from '../../../http/router/RouteTree';
import { NotFoundError } from '../../../errors/NotFoundError';
import { MethodNotAllowedError } from '../../../errors/MethodNotAllowedError';

// / & /:id
// POST /public/user/:id
// GET /public/user/:id
// GET /public/game/:id
// GET /
// GET /:param

describe('Router tests', () => {
  it('should return correct controller and action', async () => {
    const tree = new RouteTree();
    const path = '/public/user/@id';
    const specificPath = '/public/user/123';
    const handler = EmptyHandler.of()
    tree.addRoute(path, Methods.GET, handler);
    const node = tree.findRoute(specificPath, Methods.GET);

    expect(node).toBeDefined();
    expect(node?.paramName()).toBe('id');
    expect(node?.paramValue()).toBe('123');
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

    const node1 = tree.findRoute(path1, Methods.GET);
    const node2 = tree.findRoute(path2, Methods.GET);

    expect(node1).toBeDefined();
    expect(node2).toBeDefined();
    expect(node1.pathNode()).toBe('image');
    expect(node2.pathNode()).toBe('list');
    expect(node2?.paramName()).toBeUndefined();
  });

  it('should handle two routes where one of them is dynamic', () => {
    const tree = new RouteTree();
    const path1 = '/public/user/@id';
    const path2 = '/public/user/list';

    tree.addRoute(path1, Methods.GET, EmptyHandler.of());
    tree.addRoute(path2, Methods.GET, EmptyHandler.of());

    const node1 = tree.findRoute(path1, Methods.GET);
    const node2 = tree.findRoute(path2, Methods.GET);

    expect(node1).toBeDefined();
    expect(node2).toBeDefined();
    expect(node1.pathNode()).toBe('@id');
    expect(node2.pathNode()).toBe('list');
    expect(node1?.paramName()).toBe('id');
    expect(node2?.paramName()).toBeUndefined();
    expect(node1?.paramValue()).toBe('@id');
    expect(node2?.paramValue()).toBeUndefined();

  });

  it('should handle static path after dynamic path', () => {
    const tree = new RouteTree();
    const path3 = '/public/user/@id/image';

    tree.addRoute(path3, Methods.GET, EmptyHandler.of());

    const node3 = tree.findRoute(path3, Methods.GET);

    expect(node3).toBeDefined();
    expect(node3.pathNode()).toBe('image');
    expect(node3?.paramName()).toBeUndefined();
    expect(node3?.paramValue()).toBeUndefined();
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

    const node = tree.findRoute(path, Methods.GET);

    expect(node).toBeDefined();
    expect(node.pathNode()).toBe('/');
    expect(node.paramName()).toBeUndefined();
    expect(node.paramValue()).toBeUndefined();
  });

  it('should be possible to add few dynamic paths on the same level', () => {
    const tree = new RouteTree();
    const path1 = '/public/user/@id';
    const path2 = `${path1}/@param`;

    tree.addRoute(path1, Methods.GET, EmptyHandler.of());
    tree.addRoute(path2, Methods.POST, EmptyHandler.of());

    const node = tree.findRoute(path1, Methods.GET);
    const node2 = tree.findRoute(path2, Methods.POST);

    expect(node).toBeDefined();
    expect(node2).toBeDefined();
  });

  it('should be possible to add multiple handlers for the same route', () => {});
});
