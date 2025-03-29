import { Inject } from './di/Inject';
import { getConfig } from './nodejs/getConfig';
import { ServiceConfiguration } from './ServiceConfiguration';

export const CONFIG = Symbol('Config');

export class ConfigService {
  constructor(@Inject(CONFIG) private readonly config: ServiceConfiguration) {
  }

  get(key: string): unknown {
    return (this.config as never)[key];
  }
}

export const getConfigValue = (config: ServiceConfiguration = getConfig()) => ({
  param: CONFIG,
  useValue: config,
});
