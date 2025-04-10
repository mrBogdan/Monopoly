import 'reflect-metadata';
import { CONTROLLER_KEY, SERVICE_KEY } from './constants';
import { isEmpty } from '../nodejs/isEmpty';
import { Constructor } from '../di';

export type FactoryParam = {
  param: unknown | string;
  useFactory?: (...rest: unknown[]) => unknown;
  useValue?: unknown;
  useClass?: unknown;
  inject?: unknown[];
}

export type ClassFactory = {
  param: string | symbol | unknown;
  useClass: unknown;
}

export type Factory = {
  param: string | symbol | unknown;
  useFactory: (...rest: unknown[]) => unknown;
  inject?: unknown[];
}

type ModuleParams = {
  controllers?: unknown[];
  services?: (unknown | FactoryParam)[];
}


export function Module(module: ModuleParams): ClassDecorator {
  return function (constructor: object): undefined {
    if (isEmpty(module.services) && isEmpty(module.controllers)) {
      throw new Error('Module should have at least one service or controller');
    }

    if (module?.controllers?.length) {
      Reflect.defineMetadata(CONTROLLER_KEY, module.controllers, constructor);
    }

    if (module?.services?.length) {
      Reflect.defineMetadata(SERVICE_KEY, module.services, constructor);
    }
  };
}

export function getModuleServices(module: object): (unknown | FactoryParam)[] {
  return Reflect.getMetadata(SERVICE_KEY, module) || [];
}

export function getModuleControllers(module: object): unknown[] {
  return Reflect.getMetadata(CONTROLLER_KEY, module) || [];
}

export enum ServiceType {
  FACTORY,
  VALUE,
  CLASS,
  CLASS_FACTORY,
}

export function getServiceType(service: unknown): ServiceType {
  if (!service) {
    throw new Error('Service is not defined');
  }

  if (isClass(service)) {
    return ServiceType.CLASS;
  }

  if (isValue(service)) {
    return ServiceType.VALUE;
  }

  if (isFactory(service)) {
    return ServiceType.FACTORY;
  }

  if (isClassFactory(service)) {
    return ServiceType.CLASS_FACTORY;
  }

  throw new Error('Unknown service type');
}

const isObject = (service: unknown): boolean => (typeof service === 'object');
const isClass = (service: object): boolean => typeof service === 'function';
const isValue = (service: object): boolean => isObject(service) && Object.hasOwn(service, 'useValue');
const isFactory = (service: object): boolean => isObject(service) && Object.hasOwn(service, 'useFactory');
const isClassFactory = (service: object): boolean => isObject(service) && Object.hasOwn(service, 'useClass');

