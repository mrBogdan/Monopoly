import 'reflect-metadata';
import {
  ClassFactory,
  Factory,
  FactoryParam,
  getModuleControllers,
  getModuleServices,
  getServiceType,
  ServiceType,
} from '../decorators';
import { castToType, isEmpty } from '../nodejs';

import { getInjectParams, InjectParams } from './Inject';
import { Gettable, getValueSource } from './Injectable';
import { Stack } from './Stack';
import { getValueParams } from './Value';

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

  public resolve<T>(classOrToken: Constructor<T> | string | unknown): T {
    if (!this.services.has(classOrToken)) {
      const token = isToken(classOrToken) ? classOrToken : (classOrToken as Constructor<unknown>).name;
      throw new Error(`Service ${token} not found`);
    }
    return this.services.get(classOrToken) as T;
  }

  private resolveDependencies(target: object) {
    const dependencies = Reflect.getMetadata('design:paramtypes', target) || [];
    return dependencies.map((dependency: unknown) => this.resolve(dependency));
  }

  public async init(modules: Constructor<unknown>[]) {
    const injectables = new Map<unknown, unknown>();
    for (const module of modules) {
      const Services = getModuleServices(module);
      const Controllers = getModuleControllers(module);

      for (const Service of Services) {
        switch (getServiceType(Service)) {
          case ServiceType.CLASS: {
            const Class = Service as Constructor<unknown>;
            const dependencies = getDependenciesMetadata(Class);

            if (isEmpty(dependencies)) {
              injectables.set(Class, resolved(new Class()));
              continue;
            }

            const injectParams = getInjectParams(Class);

            if (!isEmpty(injectParams)) {
              if (isAllDependenciesResolved(injectParams.map(({token}) => token), injectables, injectParams)) {
                injectParams.forEach(({token, index}) => {
                  dependencies[index] = getResolvedInstance(injectables.get(token) as ResolvedInstance);
                });
              }
            }

            const valueParams = getValueParams(Class);

            if (!isEmpty(valueParams)) {
              const valueSource = getValueSource();
              const valueSourceInjectable = injectables.get(valueSource);

              if (isResolved(valueSourceInjectable)) {
                const valueSourceInstance = resolved(valueSourceInjectable) as Gettable;
                valueParams.forEach(({param, index}) => {
                  dependencies[index] =  valueSourceInstance.get(param);
                });
              }
            }

            if (isAllDependenciesResolved(dependencies.map(s => Object.getPrototypeOf(s).constructor), injectables)) {
              injectables.set(Class, resolved(new Class(...dependencies)));
              continue;
            }

            injectables.set(Class, Class);
            break;
          }
          case ServiceType.CLASS_FACTORY: {
            const classFactory = Service as ClassFactory;
            const Class = classFactory.useClass as Constructor<unknown>;
            const dependencies = getDependenciesMetadata(Class);

            if (isEmpty(dependencies)) {
              injectables.set(classFactory.param, resolved(new Class()));
              continue;
            }

            const injectParams = getInjectParams(Class);

            if (!isEmpty(injectParams)) {
              if (isAllDependenciesResolved(injectParams.map(({token}) => token), injectables)) {
                injectParams.forEach(({token, index}) => {
                  dependencies[index] = getResolvedInstance(injectables.get(token) as ResolvedInstance);
                });
              }
            }

            const valueParams = getValueParams(Class);

            if (!isEmpty(valueParams)) {
              const valueSource = getValueSource();
              const valueSourceInjectable = injectables.get(valueSource);

              if (isResolved(valueSourceInjectable)) {
                const valueSourceInstance = getResolvedInstance(valueSourceInjectable as ResolvedInstance) as Gettable;
                valueParams.forEach(({param, index}) => {
                  dependencies[index] =  valueSourceInstance.get(param);
                });
              }
            }

            if(isAllDependenciesResolved(dependencies, injectables)) {
              injectables.set(classFactory.param, resolved(new Class(...dependencies)));
              continue;
            }

            injectables.set(classFactory.param, Class);

            break;
          }
          case ServiceType.FACTORY: {
            const factory = Service as Factory;
            if (isEmpty(factory.inject)) {
              injectables.set(factory.param, resolved(await factory.useFactory()));
              continue;
            }

            if (!isEmpty(factory.inject) && isAllDependenciesResolved(factory.inject as [], injectables)) {
              const dependencies = (factory.inject as []).map((dep: unknown) => injectables.get(dep));
              injectables.set(factory.param, resolved(await factory.useFactory(...dependencies)));
              continue;
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

      for (const Class of Controllers) {
        const Controller = Class as Constructor<unknown>;
        const dependencies = getDependenciesMetadata(Controller);

        if (isEmpty(dependencies)) {
          injectables.set(Controller, resolved(new Controller()));
          continue;
        }

        injectables.set(Controller, Controller);
      }
    }

    const stack = new Stack<[unknown, unknown]>();

    for (const injectable of injectables) {
      stack.push(injectable);

      while (!stack.isEmpty()) {
        const [key, value] = stack.top();

        if (isResolved(value)) {
          stack.pop();
          continue;
        }

        if (!value) {
          console.warn(`Could not find dependency ${(key as Constructor).toString()}`);
        }

        switch (getServiceType(value)) {
          case ServiceType.FACTORY: {
            const factory = value as Factory;

            const inject = factory.inject as unknown[];

            const notResolvedDependencies = inject.filter((dep: unknown) => !isResolved(injectables.get(dep)));

            if (isEmpty(notResolvedDependencies)) {
              const resolvedDependencies = inject.map((dep: unknown) => getResolvedInstance(injectables.get(dep) as ResolvedInstance));
              const instance = await factory.useFactory(...resolvedDependencies);
              injectables.set(factory.param, resolved(instance));
              stack.pop();
              continue;
            }

            for (const dependency of notResolvedDependencies) {
              stack.push([dependency, injectables.get(dependency)]);
            }

            break;
          }

          case ServiceType.CLASS: {
            const Class = value as Constructor<unknown>;
            const dependencies = getDependenciesMetadata(Class);

            const injectParams = getInjectParams(Class);

            if (!isEmpty(injectParams)) {
              injectParams.forEach(({token, index}) => {
                dependencies[index] = token;
              });
            }

            const valueParams = getValueParams(Class);

            if (!isEmpty(valueParams)) {
              const valueSource = getValueSource();
              const valueSourceInjectable = injectables.get(valueSource);

              if (isResolved(valueSourceInjectable)) {
                const valueSourceInstance = getResolvedInstance(valueSourceInjectable as ResolvedInstance) as Gettable;
                valueParams.forEach(({param, index, type}) => {
                  dependencies[index] = castToType(valueSourceInstance.get(param), type);
                });
              }
            }

            const notResolvedDependencies = dependencies.filter((dep: unknown) => {
              if (isPrimitive(dep)) {
                return false;
              }

              return !isResolved(injectables.get(dep));
            });

            if (isEmpty(notResolvedDependencies)) {
              const resolvedDependencies = dependencies.map((dep: unknown) => {
                const isInjectedParam = injectParams?.some(({token}) => token === dep);
                if (isPrimitive(dep) && !isInjectedParam) {
                  return dep;
                }

                return getResolvedInstance(injectables.get(dep) as ResolvedInstance);
              });

              const instance = new Class(...resolvedDependencies);
              injectables.set(key, resolved(instance));
              stack.pop();
            } else {
              for (const dependency of notResolvedDependencies) {
                stack.push([dependency, injectables.get(dependency)]);
              }
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

const resolved = (instance: unknown): unknown => ({
  [INSTANCE_KEY]: instance,
});

const getResolvedInstance = (instance: ResolvedInstance) => instance[INSTANCE_KEY];

const isAllDependenciesResolved = (dependencies: unknown[], injectables: Map<unknown, unknown>, injectionParams?: InjectParams[]) => {
  for (const dependency of dependencies) {
    const isInjectedParam = injectionParams?.some(({token}) => token === dependency);
    if (isPrimitive(dependency) && !isInjectedParam) {
      return true;
    }

    if (!isResolved(injectables.get(dependency))) {
      return false;
    }
  }
  return true;
};

const isResolved = (instance: unknown) => instance && Object.hasOwn(instance, INSTANCE_KEY);

const isPrimitive = (value: unknown): boolean => {
  return (value === null || (typeof value !== 'object' && typeof value !== 'function') && !isSymbol(value));
}

const isSymbol = (value: unknown): boolean => {
  return typeof value === 'symbol';
}

const getDependenciesMetadata = (Class: Constructor<unknown>): unknown[] => {
  return Reflect.getMetadata('design:paramtypes', Class) || [];
};
