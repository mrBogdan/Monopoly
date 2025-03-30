import { RouteNode } from './RouteNode';
import { DynamicRouteNode } from './DynamicRouteNode';
import { StaticRouteNode } from './StaticRouteNode';
import { Methods } from '../Methods';
import { Handler } from './Handler';
import { RouteHandler } from './RouteHandler';

export class RouteNodeFactory {
  public static create(path: string, method: Methods, handler: Handler): RouteNode {
    if (RouteNode.isDynamicPath(path)) {
      return new DynamicRouteNode(path, method, handler);
    }
    return new StaticRouteNode(path, method, handler);
  }

  public static empty(path: string): RouteNode {
    if (RouteNode.isDynamicPath(path)) {
      return new DynamicRouteNode(path, Methods.NONE, RouteHandler.empty());
    }
    return new StaticRouteNode(path, Methods.NONE, RouteHandler.empty());
  }
}
