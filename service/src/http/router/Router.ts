import { buildRoutes } from '../../decorators/buildRoutes';
import { Methods } from '../Methods';

import { Handler } from './Handler';
import { Route } from './Route';
import { RouteHandler } from './RouteHandler';
import { RouteTree } from './RouteTree';



export class Router {
  private _routeTree: RouteTree = new RouteTree();

  constructor() {
    this.buildRoutes();
  }

  public findRoute(path: string, method: Methods): Route {
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

  private buildRoutes() {
    buildRoutes((path, method, Controller, action) => {
      this._routeTree.addRoute(path, method, new RouteHandler(Controller, action));
    });
  }
}
