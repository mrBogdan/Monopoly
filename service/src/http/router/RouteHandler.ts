import { Handler } from './Handler';

export class RouteHandler implements Handler {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly _controller: any, private readonly _action: string) {}

  public static empty(): Handler {
    return new RouteHandler('', '');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public controller(): any {
    return this._controller;
  }

  public action(): string {
    return this._action;
  }
}
