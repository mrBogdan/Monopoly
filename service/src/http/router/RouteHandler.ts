import { Handler } from './Handler';

export class RouteHandler implements Handler {
  constructor(private readonly _controller: string, private readonly _action: string) {}

  public static empty(): Handler {
    return new RouteHandler('', '');
  }

  public controller(): string {
    return this._controller;
  }

  public action(): string {
    return this._action;
  }
}
