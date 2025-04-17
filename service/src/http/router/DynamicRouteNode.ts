import { Methods } from '../Methods';

import { Handler } from './Handler';
import { ParametrizedRoute } from './ParametrizedRoute';
import { RouteNode } from './RouteNode';

export class DynamicRouteNode extends RouteNode implements ParametrizedRoute {
  private readonly _paramName: string;
  private _paramValue: string = '';

  constructor(pathNode: string, method: Methods, handler: Handler) {
    super(pathNode, method, handler);
    this._paramName = pathNode.slice(1);
  }

  public isDynamic(): boolean {
    return true;
  }

  public paramName(): string {
    return this._paramName;
  }

  public paramValue(): string {
    return this._paramValue;
  }

  public setParamValue(value: string) {
    this._paramValue = value;
  }
}
