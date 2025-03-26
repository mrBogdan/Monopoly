/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';

export class Container {
  private services: Map<any, any> = new Map();

  register<T>(target: new (...args: any[]) => T) {
    if (!this.services.has(target)) {
      this.services.set(target, new target(...this.resolveDependencies(target)));
    }
  }

  public resolve<T>(service: T): T {
    if (!this.services.has(service)) {
      throw new Error(`Service ${service} not found`);
    }
    return this.services.get(service);
  }

  private resolveDependencies(service: any) {
    const dependencies = Reflect.getMetadata('design:paramtypes', service) || [];
    return dependencies.map((dependency: any) => this.resolve(dependency));
  }
}
