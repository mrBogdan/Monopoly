import { NotFoundError } from '../../errors/NotFoundError';
import { Methods } from '../Methods';

import { delimiter } from './constants';
import { DynamicRouteNode } from './DynamicRouteNode';
import { Handler } from './Handler';
import { RouteNode } from './RouteNode';


export class Route {
  private readonly _routeParams: Map<string, string> = new Map();
  private _handler: Handler | undefined;
  private readonly _routeNodes: RouteNode[] = [];

  constructor(
    private readonly _originalPath: string,
    private readonly _method: Methods,
  ) {
  }

  public method(): Methods {
    return this._method;
  }

  public path(): string {
    return this._originalPath;
  }

  public handler(): Handler {
    if (!this._handler) {
      throw new NotFoundError('Handler is not set');
    }
    return this._handler;
  }

  public setHandler(handler: Handler): void {
    this._handler = handler;
  }

  public addRouteNode(node: RouteNode): void {
    this._routeNodes.push(node);
  }

  public getParams(): Map<string, string> {
    const dynamicNodes = this._routeNodes.filter(node => node.isDynamic()) as DynamicRouteNode[];

    return dynamicNodes.reduce((params, node) => {
      params.set(node.paramName(), node.paramValue());
      return params;
    }, new Map<string, string>());
  }

  public buildPath(): string {
    return this._routeNodes.reduce((path, node) => {
      return [path, node.pathNode()].join(delimiter);
    }, '');
  }
}
