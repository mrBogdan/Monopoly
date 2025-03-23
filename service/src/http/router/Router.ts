import { RouteTree } from './RouteTree';
import { Handler } from './Handler';
import { Methods } from '../Methods';
import { getControllers } from '../../decorators/Controller';
import { RouteHandler } from './RouteHandler';
import { METHOD_KEY, PATH_KEY } from '../../decorators/constants';
import { delimiter } from './constants';

export class Router {
  private readonly _routeTree: RouteTree;

  constructor() {
    this._routeTree = new RouteTree();
  }

  public buildRoutes() {
    const controllers = getControllers();

    controllers.forEach((Controller, path) => {
      Reflect.ownKeys(Controller.prototype).forEach((action) => {
        const route = Reflect.getMetadata(PATH_KEY, Controller.prototype, action.toString());
        const method = Reflect.getMetadata(METHOD_KEY, Controller.prototype, action.toString());

        if (route) {
          this._routeTree.addRoute([path, route].join(delimiter), method, new RouteHandler(Controller.prototype.constructor.name, action.toString()));
        }
      });
    });
  }

  public findRoute(path: string, method: Methods) {
    return this._routeTree.findRoute(path, method);
  }

  public get(route: string, handler: Handler) {
    this._routeTree.addRoute(route, Methods.GET, handler);
  }

  public post(route: string, handler: Handler) {
    this._routeTree.addRoute(route, Methods.POST, handler);
  }

  public put(route: string, handler: Handler) {
    this._routeTree.addRoute(route, Methods.PUT, handler);
  }

  public delete(route: string, handler: Handler) {
    this._routeTree.addRoute(route, Methods.DELETE, handler);
  }
}
