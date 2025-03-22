import { Methods } from '../Methods';
import { RouteNode } from './RouteNode';
import { rootPath } from './constants';
import { Route } from './Route';
import { Handler } from './Handler';
import { NotFoundError } from '../../errors/NotFoundError';
import { MethodNotAllowedError } from '../../errors/MethodNotAllowedError';

const isLast = (index: number, array: string[]) => index === array.length - 1;

export class RouteTree {
  private readonly root: RouteNode;

  constructor() {
    this.root = RouteNode.empty(rootPath);
  }

  addRoute(path: string, method: Methods, handler: Handler): undefined {
    const route = new Route(path);
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
          RouteNode.of(routePart, method, handler) :
          RouteNode.empty(routePart);

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

  findRoute(path: string, method: Methods): RouteNode {
    const route = new Route(path);
    const fromRoot = route.fromRoot();

    let currentNode = this.root;

    if (route.isRoot() && currentNode.hasMethod(method)) {
      return currentNode;
    }

    for (const [index, routePart] of fromRoot.entries()) {
      const child = currentNode.findAnyChild(routePart);

      if (!child) {
        throw new NotFoundError(`Route "${path}" with method ${method} not found`);
      }

      if (child.isDynamic()) {
        child.setParamValue(routePart);
      }

      currentNode = child;

      if (isLast(index, fromRoot)) {
        if (!child.hasMethod(method)) {
          throw new MethodNotAllowedError(`Method ${method} not allowed for route "${path}"`);
        }

        return child;
      }
    }

    throw new NotFoundError(`Route "${path}" with method ${method} not found`);
  }
}
