import { delimiter, rootPath } from './constants';

export class Route {
  private readonly _pathParts: string[];

  constructor(path: string) {
    const split = path.split(delimiter).filter(Boolean);
    split.unshift(rootPath);
    this._pathParts = split;
  }

  public fromRoot(): string[] {
    return this._pathParts.slice(1);
  }

  public isRoot(): boolean {
    return this._pathParts.length === 1;
  }
}
