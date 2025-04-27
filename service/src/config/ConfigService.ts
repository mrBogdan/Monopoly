import { Inject, Injectable } from '../di';

import { ServiceConfiguration } from './ServiceConfiguration';

export const CONFIG = Symbol('Config');

@Injectable({valueSource: true})
export class ConfigService {
  constructor(@Inject(CONFIG) private readonly config: ServiceConfiguration) {
  }

  get(key: string): unknown {
    let path = key;
    let defaultValue: unknown;
    let value: unknown;

    if (key.includes(':')) {
      [path, defaultValue] = key.split(':');
    }

    if (path.includes('.')) {
      const keys = path.split('.');
      value = keys.reduce((acc, k) => {
        if (typeof acc === 'object' && acc !== null && k in acc) {
          return (acc as unknown as Record<string, unknown>)[k];
        }
      }, this.config as unknown);
    } else {
      value = this.config[path as keyof ServiceConfiguration];
    }

    if (value === undefined && defaultValue !== undefined) {
      return defaultValue;
    }

    if (value === undefined) {
      throw new Error(`Key ${key} not found in configuration`);
    }

    return value;
  }
}

export const getConfigValue = (config: ServiceConfiguration) => ({
  param: CONFIG,
  useValue: config,
});
