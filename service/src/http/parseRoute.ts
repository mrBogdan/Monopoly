import 'reflect-metadata';

import { NotFoundError } from '../errors/NotFoundError';
import { getControllers } from '../decorators/Controller';
import { METHOD_KEY, PATH_KEY } from '../decorators/constants';
import { Methods } from './Methods';

const notFoundError = new NotFoundError('Handler not found');
const defaultAction = '';
const delimiter = '/';
const rootPath = '/';
const dynamicPathToken = '@';
const preparePath = (pathName?: string) => (!pathName ? '/' : `/${pathName}`);

const findHandler = (Controller: unknown, prototype: object, method: Methods, path: string) => {
  const handlers = Object.getOwnPropertyNames(prototype);

  for (const handler of handlers) {
    const handlerPath = Reflect.getOwnMetadata(PATH_KEY, prototype, handler);
    const handlerMethod = Reflect.getOwnMetadata(METHOD_KEY, prototype, handler);

    if (path === handlerPath && handlerMethod === method) {
      return {
        class: Controller,
        method: handler,
      };
    }
  }

  throw notFoundError;
}

export const parseRoute = (method: Methods, url: string) => {
  const controllers = getControllers();

  const splitUrl = url.split(delimiter).filter(v => v);

  if (splitUrl.length === 0) {
    const Controller = controllers.get(rootPath);

    if (!Controller) {
      throw notFoundError;
    }

    return findHandler(Controller, Controller.prototype, method, defaultAction);
  }

  if (splitUrl.length === 1) {
    const Controller = controllers.get(preparePath(splitUrl[0]));

    if (!Controller) {
      throw notFoundError;
    }

    return findHandler(Controller, Controller.prototype, method, defaultAction);
  }

  if (splitUrl.length > 1) {
    const partPath = splitUrl[0];
    const Controller = controllers.get(preparePath(partPath));

    if (!Controller) {
      throw notFoundError;
    }

    const handlers = Object.getOwnPropertyNames(Controller.prototype);

    for (const handler of handlers) {
      const handlerPath = Reflect.getOwnMetadata(PATH_KEY, Controller.prototype, handler);
      const handlerMethod = Reflect.getOwnMetadata(METHOD_KEY, Controller.prototype, handler);
      const partPath = preparePath(splitUrl[1]);

      if (handlerPath === partPath  && handlerMethod === method) {
        return {
          class: Controller,
          method: handler,
        };
      }
    }
  }

  throw notFoundError;
};

const buildPath = (paths: string[]) => {
  return paths.join(delimiter);
};

type Route = {
  fullPath: string;
  controller: unknown;
  action: string;
  method: Methods;
  isDynamic: boolean;
}

const buildRoutes = () => {
  const controllers = getControllers();
  const routes: Map<string, Route> = new Map<string, Route>();

  controllers.forEach((Controller, path) => {
    const handlers = Object.getOwnPropertyNames(Controller.prototype);

    handlers.forEach(handler => {
      const actionPath = Reflect.getOwnMetadata(PATH_KEY, Controller.prototype, handler);
      const method = Reflect.getOwnMetadata(METHOD_KEY, Controller.prototype, handler);
      const fullPath = buildPath([path, actionPath]);

      routes.set(fullPath,{
        method,
        fullPath,
        controller: Controller,
        action: handler,
        isDynamic: path.includes(dynamicPathToken),
      });
    });
  });

  return routes;
};

const routes = buildRoutes();

export const findHandlerByPath = (method: Methods, path: string) => {
  const route = routes.get(path);

  if (!route || route.method !== method) {
    throw notFoundError;
  }

  return route;
}

// /user/:id
// /user/images/list

/*
*  @Controller('public/user')
*  class UserController {
*    @Get(':imageId')
*    getList(@Param('imageId') imageId: string) {}
*  }
* */

/**
 *          /
 *    Admin | Public
 *      |         |
 * (User | Game) User | Game
 *
 * public/user/:id
 * admin/user/:id
 */

const isLast = (index: number, array: string[]) => index === array.length - 1;

class RouteTree {
  private readonly root: RouteNode;

  constructor() {
    this.root = RouteNode.empty(rootPath);
  }

  // / & /:id
  // POST /public/user/:id
  // GET /public/game/:id
  addRoute(path: string, method: Methods, handler: Handler) {
    const routeParts = path.split(delimiter).filter(Boolean);
    let currentNode = this.root;

    routeParts.forEach((routePart, index) => {
      let child = currentNode.findChild(routePart);

      if (!child) {
        child = isLast(index, routeParts) ?
          RouteNode.of(routePart, method, handler) :
          RouteNode.empty(routePart);
        currentNode.addChild(routePart, child);
      }

      currentNode = child;

      if (isLast(index, routeParts)) {
        child.setHandler(method, handler);
      }
    });
  }
}

interface Handler {
  controller: string;
  action: string;

  isEmpty(): boolean;
}

class EmptyHandler implements Handler {
  controller = '';
  action = '';

  isEmpty() {
    return true;
  }

  static of() {
    return new EmptyHandler();
  }
}

class RouteNode {
  private readonly _isDynamic: boolean;
  private pathNode: string;
  private children: Map<string, RouteNode>;
  private methods: Map<Methods, Handler>;
  private _paramName?: string;

  constructor(pathNode: string, method: Methods, handler: Handler) {
    this.pathNode = pathNode;
    this.children = new Map<string, RouteNode>();
    this.methods = new Map<Methods, Handler>([
      [method, handler]
    ]);
    this._isDynamic = pathNode.includes(dynamicPathToken);

    if (this._isDynamic) {
      this._paramName = pathNode.slice(1);
    }
  }

  public static of(path: string, method: Methods, handler: Handler) {
    return new RouteNode(path, method, handler);
  }

  public static empty(path: string) {
    return new RouteNode(path, Methods.NONE, EmptyHandler.of());
  }

  public findChild(pathNode: string) {
    return this.children.get(pathNode) || Array.from(this.children.values()).find(child => child.isDynamic());
  }

  public addChild(pathNode: string, childNode: RouteNode): void {
    this.children.set(pathNode, childNode);
  }

  public isDynamic(): boolean {
    return this._isDynamic;
  }

  public paramName(): string | undefined {
    return this._paramName;
  }

  public setHandler(method: Methods, handler: Handler) {
    this.methods.set(method, handler);
  }
}

void function Playground() {
  const tree = new RouteTree();
  tree.addRoute('/public/user/@id', Methods.GET, EmptyHandler.of());

  console.dir({ tree }, { depth: 15 });
}();

void function TestCases() {
  return [
    'Should have only one dynamic path for each route',
    'Should have single root',
    'Should be handled with correct method',
    'Should be possible to set handler for root',
    'Should be possible to have a static path after dynamic path',
  ];
}();
