import { Methods } from '../Methods';

import { dynamicPathToken } from './constants';
import { Handler } from './Handler';
import { RouteHandler } from './RouteHandler';

export abstract class RouteNode {
  private readonly _pathNode: string;
  private children: Map<string, RouteNode>;
  private methods: Map<Methods, Handler>;

  protected constructor(pathNode: string, method: Methods, handler: Handler) {
    this._pathNode = pathNode;
    this.children = new Map<string, RouteNode>();
    this.methods = new Map<Methods, Handler>([
      [method, handler],
    ]);
  }

  abstract isDynamic(): boolean;

  public static of<T extends RouteNode>(this: new (path: string, method: Methods, handler: Handler) => T, path: string, method: Methods, handler: Handler): T {
    return new this(path, method, handler);
  }

  public static empty<T extends RouteNode>(this: new (path: string, method: Methods, handler: Handler) => T, path: string): T {
    return new this(path, Methods.NONE, RouteHandler.empty()) as T;
  }

  public static isDynamicPath(path: string): boolean {
    return path.includes(dynamicPathToken);
  }

  public hasMethod(method: Methods) {
    return this.methods.has(method) || this.methods.has(Methods.ANY);
  }

  public findAnyChild(pathNode: string) {
    return this.children.get(pathNode) || Array.from(this.children.values()).find(child => child.isDynamic());
  }

  public findChild(pathNode: string) {
    return this.children.get(pathNode) || Array.from(this.children.values()).find(child => child.isDynamic() && child.pathNode() === pathNode);
  }

  public hasDynamicChild(): boolean {
    return !!Array.from(this.children.values()).find(child => child.isDynamic());
  }

  public addChild(pathNode: string, childNode: RouteNode): void {
    this.children.set(pathNode, childNode);
  }

  public pathNode(): string {
    return this._pathNode;
  }

  public setHandler(method: Methods, handler: Handler) {
    this.methods.set(method, handler);
  }

  public handler(method: Methods): Handler {
    return this.methods.get(method) || this.methods.get(Methods.ANY) || RouteHandler.empty();
  }
}
