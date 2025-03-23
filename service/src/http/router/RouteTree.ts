import { Methods } from '../Methods';
import { StaticRouteNode } from './StaticRouteNode';
import { rootPath } from './constants';
import { RouteParticle } from './RouteParticle';
import { Handler } from './Handler';
import { NotFoundError } from '../../errors/NotFoundError';
import { MethodNotAllowedError } from '../../errors/MethodNotAllowedError';
import { DynamicRouteNode } from './DynamicRouteNode';
import { RouteNodeFactory } from './RouteNodeFactory';
import { Route } from './Route';

const isLast = (index: number, array: string[]) => index === array.length - 1;

export class RouteTree {
  private readonly root: StaticRouteNode;

  constructor() {
    this.root = StaticRouteNode.empty(rootPath);
  }

  addRoute(path: string, method: Methods, handler: Handler): void {
    const route = new RouteParticle(path);
    const fromRoot = route.fromRoot();
    let currentNode = this.root;

    if (route.isRoot()) {
      currentNode.setHandler(method, handler);
      return;
    }

    fromRoot.forEach((routePart, index) => {
      let child = currentNode.findChild(routePart);
      const isLastElement = isLast(index, fromRoot);
      if (!child) {
        child = isLastElement ?
          RouteNodeFactory.create(routePart, method, handler) :
          RouteNodeFactory.empty(routePart);

        if (currentNode.hasDynamicChild() && child.isDynamic()) {
          throw new Error(`There is already a dynamic child in the route "${path}"`);
        }

        currentNode.addChild(routePart, child);
      }

      currentNode = child;

      if (isLastElement) {
        currentNode.setHandler(method, handler);
      }
    });
  }

  findRoute(path: string, method: Methods): Route {
    const routeParticle = new RouteParticle(path);
    const fromRoot = routeParticle.fromRoot();
    const route = new Route(path, method);

    let currentNode = this.root;

    if (routeParticle.isRoot() && currentNode.hasMethod(method)) {
      route.setHandler(currentNode.handler(method));
      route.addRouteNode(currentNode);
      return route;
    }

    for (const [index, routePart] of fromRoot.entries()) {
      const child = currentNode.findAnyChild(routePart);

      if (!child) {
        throw new NotFoundError(`Route "${path}" with method ${method} not found`);
      }

      if (child.isDynamic()) {
        (child as DynamicRouteNode).setParamValue(routePart);
      }

      route.addRouteNode(child);
      currentNode = child;

      if (isLast(index, fromRoot)) {
        if (!child.hasMethod(method)) {
          throw new MethodNotAllowedError(`Method ${method} not allowed for route "${path}"`);
        }

        route.setHandler(child.handler(method));
        return route;
      }
    }

    throw new NotFoundError(`Route "${path}" with method ${method} not found`);
  }
}
