import 'reflect-metadata';
import {
  Factory,
  FactoryParam,
  getModuleControllers,
  getModuleServices,
  getServiceType,
  ServiceType,
} from '../decorators/Module';
import { Stack } from '../Stack';
import { isEmpty } from '../nodejs/isEmpty';
import { getInjectParams } from './Inject';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T = any> = new (...args: any[]) => T;

const isToken = (tokenOrInstance?: unknown): boolean => (!!tokenOrInstance && typeof tokenOrInstance === 'string');
const isInstance = (tokenOrInstance?: unknown): boolean => (!!tokenOrInstance && typeof tokenOrInstance === 'object');

export class Container {
  private services: Map<unknown, unknown> = new Map();

  register<T>(target: Constructor<T>, tokenOrInstance?: string | object): void {
    if (isToken(tokenOrInstance)) {
      if (!this.services.has(tokenOrInstance)) {
        this.services.set(tokenOrInstance, new target(...this.resolveDependencies(target)));
      }
      return;
    }

    if (isInstance(tokenOrInstance)) {
      if (!this.services.has(target)) {
        this.services.set(target, tokenOrInstance);
      }
      return;
    }

    if (!this.services.has(target)) {
      this.services.set(target, new target(...this.resolveDependencies(target)));
    }
  }

  public resolve<T>(classOrToken: T | string): T {
    if (!this.services.has(classOrToken)) {
      throw new Error(`Service ${classOrToken} not found`);
    }
    return this.services.get(classOrToken) as T;
  }

  private resolveDependencies(target: object) {
    const dependencies = Reflect.getMetadata('design:paramtypes', target) || [];
    return dependencies.map((dependency: unknown) => this.resolve(dependency));
  }

  public async init(modules: unknown[]) {
    const injectables = new Map<unknown, unknown>();
    for (const module of modules) {
      const Services = getModuleServices(module as object);
      const Controllers = getModuleControllers(module as object);

      for (const Service of Services) {
        switch (getServiceType(Service)) {
          case ServiceType.CLASS: {
            const dependencies = getDependenciesMetadata(Service as Constructor<unknown>);

            if (isEmpty(dependencies)) {
              injectables.set(Service, resolved(new (Service as Constructor<unknown>)()));
              continue;
            }

            const injectParams = getInjectParams(Service as Constructor<unknown>);

            if (!isEmpty(injectParams)) {
              if (isAllDependenciesResolved(injectParams.map(({token}) => token), injectables)) {
                injectParams.forEach(({token, index}) => {
                  dependencies[index] = getResolvedInstance(injectables.get(token) as ResolvedInstance);
                });
              }
            }

            if (isAllDependenciesResolved(dependencies.map(s => Object.getPrototypeOf(s).constructor), injectables)) {
              injectables.set(Service, resolved(new (Service as Constructor<unknown>)(...dependencies)));
              continue;
            }

            injectables.set(Service, Service);
            break;
          }
          case ServiceType.FACTORY: {
            const factory = Service as Factory;
            let instance = null;
            if (isEmpty(factory.inject)) {
              instance = await factory.useFactory();
            }

            if (!isEmpty(factory.inject) && isAllDependenciesResolved(factory.inject as [], injectables)) {
              const dependencies = (factory.inject as []).map((dep: unknown) => injectables.get(dep));
              instance = await factory.useFactory(...dependencies);
            }

            if (instance) {
              injectables.set(factory.param, resolved(instance));
            }

            injectables.set(factory.param, factory);
            break;
          }
          case ServiceType.VALUE: {
            const value = Service as FactoryParam;
            injectables.set(value.param, resolved(value.useValue));
            break;
          }
        }
      }

      for (const Controller of Controllers) {
        injectables.set(Controller as Constructor<unknown>, Controller);
      }
    }

    const stack = new Stack<[unknown, unknown]>();

    for (const injectable of injectables) {
      stack.push(injectable);

      while (!stack.isEmpty()) {
        const [, value] = stack.top();

        if (isResolved(value)) {
          stack.pop();
          continue;
        }

        switch (getServiceType(value)) {
          case ServiceType.FACTORY: {
            const factory = value as Factory;

            const inject = factory.inject as unknown[];

            const dependencies = inject.filter((dep: unknown) => !isResolved(injectables.get(dep)));

            if (isEmpty(dependencies)) {
              const resolvedDependencies = inject.map((dep: unknown) => injectables.get(dep));
              const instance = await factory.useFactory(...resolvedDependencies);
              injectables.set(factory.param, resolved(instance));
              stack.pop();
            }

            for (const dependency of dependencies) {
              stack.push([dependency, injectables.get(dependency)]);
            }

            break;
          }

          case ServiceType.CLASS: {
            const Class = value as Constructor<unknown>;
            const dependencies = getDependenciesMetadata(Class);
            const notResolvedDependencies = dependencies.filter((dep: unknown) => !isResolved(injectables.get(dep)));

            if (isEmpty(notResolvedDependencies)) {
              const resolvedDependencies = dependencies.map((dep: unknown) => injectables.get(dep));

              const injectParams = getInjectParams(Class as Constructor<unknown>);

              if (!isEmpty(injectParams)) {
                if (isAllDependenciesResolved(injectParams.map(({token}) => token), injectables)) {
                  injectParams.forEach(({token, index}) => {
                    resolvedDependencies[index] = token;
                  });
                }
              }

              const instance = new Class(...resolvedDependencies);
              injectables.set(Class, resolved(instance));
              stack.pop();
            }
            break;
          }
          default: {
            throw new Error(`Unknown service type on dependency resolution ${value}`);
          }
        }
      }
    }

    for (const [key, value] of injectables) {
      this.services.set(key, getResolvedInstance(value as ResolvedInstance));
    }
  }
}

const INSTANCE_KEY = Symbol('instance');

type ResolvedInstance = {
  [INSTANCE_KEY]: unknown;
}

const resolved = (instance: unknown) => ({
  [INSTANCE_KEY]: instance,
});

const getResolvedInstance = (instance: ResolvedInstance) => instance[INSTANCE_KEY];

const isAllDependenciesResolved = (dependencies: unknown[], injectables: Map<unknown, unknown>) => {
  for (const dependency of dependencies) {
    const value = injectables.get(dependency);
    if (!isResolved(value)) {
      return false;
    }
  }
  return true;
};

const isResolved = (instance: unknown) => instance && Object.hasOwn(instance, INSTANCE_KEY);

const getDependenciesMetadata = (Class: object): unknown[] => {
  return Reflect.getMetadata('design:paramtypes', Class) || [];
};
