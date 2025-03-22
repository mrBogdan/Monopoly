import { Methods } from '../Methods';
import { Handler } from './Handler';
import { EmptyHandler } from './EmptyHandler';
import { dynamicPathToken } from './constants';

export class RouteNode {
  private readonly _isDynamic: boolean;
  private _pathNode: string;
  private children: Map<string, RouteNode>;
  private methods: Map<Methods, Handler>;
  private _paramName?: string;
  private _paramValue?: string;

  constructor(pathNode: string, method: Methods, handler: Handler) {
    this._pathNode = pathNode;
    this.children = new Map<string, RouteNode>();
    this._paramValue = undefined;
    this.methods = new Map<Methods, Handler>([
      [method, handler],
    ]);
    this._isDynamic = pathNode.includes(dynamicPathToken);

    if (this._isDynamic) {
      this._paramName = pathNode.slice(1);
    }
  }

  public static of(path: string, method: Methods, handler: Handler) {
    return new RouteNode(path, method, handler);
  }

  public static empty(path: string) {
    return new RouteNode(path, Methods.NONE, EmptyHandler.of());
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

  public isDynamicPath(path: string): boolean {
    return path.includes(dynamicPathToken);
  }

  public addChild(pathNode: string, childNode: RouteNode): void {
    this.children.set(pathNode, childNode);
  }

  public isDynamic(): boolean {
    return this._isDynamic;
  }

  public paramName(): string | undefined {
    return this._paramName;
  }

  public pathNode(): string {
    return this._pathNode;
  }

  public paramValue(): string | undefined {
    return this._paramValue;
  }

  public setParamValue(value: string) {
    this._paramValue = value;
  }

  public setHandler(method: Methods, handler: Handler) {
    this.methods.set(method, handler);
  }
}
