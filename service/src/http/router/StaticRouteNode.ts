import { Methods } from '../Methods';

import { Handler } from './Handler';
import { RouteNode } from './RouteNode';

export class StaticRouteNode extends RouteNode {

  constructor(pathNode: string, method: Methods, handler: Handler) {
    super(pathNode, method, handler);
  }

  public isDynamic(): boolean {
    return false;
  }
}
